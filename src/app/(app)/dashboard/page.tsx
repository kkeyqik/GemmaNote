"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import Editor from "@/components/Editor";
import { PenSquare, LayoutGrid, Star, Trash2, Archive, Plus, Search, Sun, Moon, Settings, FileText, BarChart2, Download, RotateCcw, XCircle, Trash, List as ListIcon, Grid as GridIcon, CheckCircle2, Tag, Cloud } from "lucide-react";
import Sidebar from "@/components/Sidebar";

type ExtensionPost = {
  id: string;
  topic: string;
  content: string;
  keywords?: string;
  minWords?: number;
  actualWords?: number;
  timestamp?: number;
};

function isExtensionPost(value: unknown): value is ExtensionPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Record<string, unknown>;
  return typeof post.id === "string" && post.id.length > 0 && post.id.length <= 128
    && typeof post.topic === "string" && post.topic.length <= 200
    && typeof post.content === "string" && post.content.length <= 2_000_000
    && (post.keywords === undefined || (typeof post.keywords === "string" && post.keywords.length <= 2_000))
    && (post.minWords === undefined || (typeof post.minWords === "number" && Number.isFinite(post.minWords)))
    && (post.actualWords === undefined || (typeof post.actualWords === "number" && Number.isFinite(post.actualWords)))
    && (post.timestamp === undefined || (typeof post.timestamp === "number" && Number.isFinite(post.timestamp)));
}

function extensionContentToSafeHtml(content: string) {
  const plainText = new DOMParser().parseFromString(content, "text/html").body.textContent ?? "";
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
  return plainText.split(/\r?\n/).filter(Boolean).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("") || "<p></p>";
}

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const [notes, setNotes] = useState<any[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<'all' | 'favorites' | 'trash' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [includeArchivedInSearch, setIncludeArchivedInSearch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Trash mechanics
  const [trashRetention, setTrashRetention] = useState(30);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [hasVisitedTrash, setHasVisitedTrash] = useState(false);

  // Quick Access Dropdown
  const [showFavDropdown, setShowFavDropdown] = useState(false);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState("Loading...");
  
  // Animation refs
  const cardsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const mapCloudDocument = (document: any) => ({
    id: document.externalId || document.id,
    topic: document.title,
    minWords: 0,
    actualWords: document.wordCount,
    content: document.content || "<p></p>",
    plainText: document.plainText || "",
    keywords: document.keywords || "",
    timestamp: new Date(document.updatedAt).getTime(),
    isFavorite: document.isFavorite,
    isTrash: document.isTrash,
    isArchived: document.isArchived,
    trashedAt: document.trashedAt ? new Date(document.trashedAt).getTime() : undefined,
  });

  const cloudPayload = (note: any) => ({
    externalId: note.id,
    title: note.topic,
    content: note.content,
    plainText: note.plainText || "",
    keywords: note.keywords || "",
    wordCount: note.actualWords || 0,
    isGenerated: note.minWords > 0,
    isFavorite: Boolean(note.isFavorite),
    isTrash: Boolean(note.isTrash),
    isArchived: Boolean(note.isArchived),
    trashedAt: note.trashedAt ? new Date(note.trashedAt).toISOString() : null,
  });

  // Load initial data from cloud
  useEffect(() => {
    const savedTheme = localStorage.getItem("gemini-theme");
    if (savedTheme === 'dark') setIsDarkMode(true);

    const visited = localStorage.getItem("gemini-visited-trash");
    if (visited) setHasVisitedTrash(true);

    const retention = localStorage.getItem("gemini-trash-retention");
    if (retention) setTrashRetention(parseInt(retention));

    const loadCloudNotes = async () => {
      try {
        const response = await fetch('/api/documents');
        if (!response.ok) throw new Error('Unable to load documents');
        const cloudDocuments = await response.json();
        const retentionDays = parseInt(localStorage.getItem("gemini-trash-retention") || "30");
        const now = Date.now();
        const mapped = cloudDocuments.map(mapCloudDocument).filter((n: any) => {
          if (n.isTrash && n.trashedAt) {
            const daysInTrash = (now - n.trashedAt) / (1000 * 60 * 60 * 24);
            if (daysInTrash > retentionDays) return false;
          }
          return true;
        });
        setNotes(mapped);
        setCloudSyncStatus('Cloud synced');
      } catch {
        setCloudSyncStatus('Unable to load notes');
      } finally {
        setNotesLoaded(true);
      }
    };

    void loadCloudNotes();

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window) return;
      const message = event.data as { type?: unknown; source?: unknown; payload?: unknown } | null;
      if (message?.type === "BLOG_POST_DATA" && message.source === "gemmanote-extension" && isExtensionPost(message.payload)) {
        const newNote = message.payload;

        // Enforce the account quota before importing
        const quotaResponse = await fetch('/api/generations/consume', { method: 'POST' });
        if (!quotaResponse.ok) {
          const quota = await quotaResponse.json().catch(() => ({ error: 'Generation limit reached' }));
          setCloudSyncStatus(quota.error || 'Generation limit reached');
          return;
        }

        setNotes((prev) => {
          if (prev.find(n => n.id === newNote.id)) return prev;
          
          const htmlContent = extensionContentToSafeHtml(newNote.content);
          const noteToSave = { 
            ...newNote, 
            content: htmlContent, 
            plainText: newNote.content,
            keywords: newNote.keywords || "",
            minWords: Math.max(0, Math.floor(newNote.minWords || 0)),
            actualWords: Math.max(0, Math.floor(newNote.actualWords || 0)),
            timestamp: newNote.timestamp && newNote.timestamp > 0 ? newNote.timestamp : Date.now(),
            isFavorite: false,
            isTrash: false,
            isArchived: false
          };
          
          return [noteToSave, ...prev];
        });
        setActiveNoteId(newNote.id);
        setActiveFolder('all');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Signal extension that the webapp is ready to receive posts
  useEffect(() => {
    window.postMessage({ type: "GEMMANOTE_READY", source: "gemmanote-webapp" }, window.location.origin);
  }, []);

  // Sync notes to cloud on change (debounced)
  const prevNotesRef = useRef<any[]>([]);
  const dirtyNotesRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (!notesLoaded) {
      prevNotesRef.current = notes;
      return;
    }

    const prevNotesMap = new Map(prevNotesRef.current.map(n => [n.id, n]));
    
    notes.forEach(note => {
      const prev = prevNotesMap.get(note.id);
      if (!prev || prev !== note) {
        dirtyNotesRef.current.set(note.id, note);
      }
    });
    
    prevNotesRef.current = notes;

    if (dirtyNotesRef.current.size === 0) return;

    const timer = window.setTimeout(async () => {
      if (dirtyNotesRef.current.size === 0) return;
      
      const notesToSync = Array.from(dirtyNotesRef.current.values());
      dirtyNotesRef.current.clear();
      
      try {
        setCloudSyncStatus('Saving...');
        await Promise.all(notesToSync.map((note) => fetch('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cloudPayload(note)),
        }).then((response) => {
          if (!response.ok) throw new Error('Save failed');
        })));
        setCloudSyncStatus('Cloud synced');
      } catch {
        notesToSync.forEach(note => {
          if (!dirtyNotesRef.current.has(note.id)) {
            dirtyNotesRef.current.set(note.id, note);
          }
        });
        setCloudSyncStatus('Sync failed — retrying...');
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [notes, notesLoaded]);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem("gemini-theme", "dark");
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem("gemini-theme", "light");
    }
  }, [isDarkMode]);

  // Derived state for filtering notes
  const displayedNotes = useMemo(() => {
    let filtered = [...notes];
    
    // 1. Favorites always sorted to top in 'all' view
    filtered.sort((a, b) => {
      if (activeFolder === 'all') {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
      }
      return b.timestamp - a.timestamp;
    });

    // 2. Filter by Folder
    if (activeFolder === 'trash') {
      filtered = filtered.filter(n => n.isTrash);
    } else if (activeFolder === 'archived') {
      filtered = filtered.filter(n => n.isArchived && !n.isTrash);
    } else if (activeFolder === 'favorites') {
      filtered = filtered.filter(n => n.isFavorite && !n.isTrash && !n.isArchived);
    } else {
      // All Notes
      filtered = filtered.filter(n => !n.isTrash && !n.isArchived);
    }

    // 3. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = notes.filter(n => {
        // If searching globally, maybe include archived if toggle is on
        if (n.isTrash) return false;
        if (n.isArchived && !includeArchivedInSearch && activeFolder !== 'archived') return false;
        
        return n.topic.toLowerCase().includes(q) || (n.plainText && n.plainText.toLowerCase().includes(q));
      });
    }
    
    return filtered;
  }, [notes, activeFolder, searchQuery, includeArchivedInSearch]);

  const activeNote = notes.find(n => n.id === activeNoteId);
  const isReadOnly = activeNote?.isTrash || activeNote?.isArchived;

  // Actions
  const handleNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      topic: "Untitled Note",
      minWords: 0,
      actualWords: 0,
      content: "<p></p>",
      plainText: "",
      keywords: "",
      timestamp: Date.now(),
      isFavorite: false,
      isTrash: false,
      isArchived: false
    };
    setNotes(prev => {
      const updated = [newNote, ...prev];
      return updated;
    });
    setActiveNoteId(newNote.id);
    setActiveFolder('all');
  };

  const handleEditorChange = (html: string, text: string) => {
    if (!activeNoteId || isReadOnly) return;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    setNotes(prev => {
      const updated = prev.map(n => 
        n.id === activeNoteId ? { ...n, content: html, actualWords: words, plainText: text } : n
      );
      return updated;
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeNoteId || isReadOnly) return;
    setNotes(prev => {
      const updated = prev.map(n => 
        n.id === activeNoteId ? { ...n, topic: e.target.value } : n
      );
      return updated;
    });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeNoteId || isReadOnly) return;
    setNotes(prev => {
      const updated = prev.map(n => 
        n.id === activeNoteId ? { ...n, keywords: e.target.value } : n
      );
      return updated;
    });
  };

  const calculateSeoScore = (note: any) => {
    if (!note) return { score: 0, details: [] };
    
    let score = 0;
    const details = [];
    const text = note.plainText || note.content.replace(/<[^>]*>?/gm, '');
    const html = note.content || '';
    const words = note.actualWords || 0;

    // 1. Word Count (Max 20)
    if (words >= 500) {
      score += 20;
      details.push({ text: 'Word count > 500', passed: true });
    } else {
      score += (words / 500) * 20;
      details.push({ text: `Word count too low (${words}/500)`, passed: false });
    }

    // 2. Headings (Max 20)
    if (html.includes('<h2') || html.includes('<h3')) {
      score += 20;
      details.push({ text: 'Uses H2/H3 tags', passed: true });
    } else {
      details.push({ text: 'Missing H2/H3 tags', passed: false });
    }

    // 3. Keywords (Max 60)
    const keywords = note.keywords ? note.keywords.split(',').map((k: string) => k.trim().toLowerCase()).filter(Boolean) : [];
    if (keywords.length === 0) {
      details.push({ text: 'No target keywords defined', passed: false });
    } else {
      let foundCount = 0;
      let overstuffed = false;
      const textLower = text.toLowerCase();

      keywords.forEach((kw: string) => {
        // Simple escape for regex
        const safeKw = kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const count = (textLower.match(new RegExp(`\\b${safeKw}\\b`, 'g')) || []).length;
        if (count > 0) foundCount++;
        
        const density = (count * kw.split(' ').length) / Math.max(1, words);
        if (density > 0.04) overstuffed = true;
      });

      if (foundCount === keywords.length) {
        score += 30;
        details.push({ text: 'All keywords found', passed: true });
      } else {
        score += (foundCount / keywords.length) * 30;
        details.push({ text: `Found ${foundCount}/${keywords.length} keywords`, passed: foundCount > 0 });
      }

      if (overstuffed) {
        details.push({ text: 'Keyword stuffing detected (>4%)', passed: false });
      } else if (foundCount > 0) {
        score += 30;
        details.push({ text: 'Healthy keyword density', passed: true });
      } else {
        details.push({ text: 'No keywords to measure density', passed: false });
      }
    }

    return { score: Math.round(score), details };
  };

  const toggleFavorite = (id: string) => {
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n);
      return updated;
    });
  };

  const handleTrashNote = (id: string) => {
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isTrash: true, trashedAt: Date.now() } : n);
      return updated;
    });
    // If not in trash view, close it
    if (activeFolder !== 'trash') {
      setActiveNoteId(null);
    }
  };

  const restoreNote = (id: string) => {
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isTrash: false, isArchived: false } : n);
      return updated;
    });
  };

  const permDeleteNote = (id: string) => {
    setNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      return updated;
    });
    setActiveNoteId(null);
  };

  const emptyTrash = () => {
    setNotes(prev => {
      const updated = prev.filter(n => !n.isTrash);
      return updated;
    });
    setActiveNoteId(null);
  };

  const toggleArchive = (id: string) => {
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isArchived: !n.isArchived } : n);
      return updated;
    });
    if (activeFolder !== 'archived') setActiveNoteId(null);
  };

  const exportFavorites = () => {
    const favs = notes.filter(n => n.isFavorite && !n.isTrash);
    const content = favs.map(n => `### ${n.topic}\n\n${n.plainText}`).join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Favorite_Notes.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFolderClick = (folder: any) => {
    setActiveFolder(folder);
    setActiveNoteId(null); // Close the pad on folder change
    if (folder === 'trash' && !hasVisitedTrash) {
      setShowTrashModal(true);
    }
  };

  const saveTrashSettings = (val: number) => {
    setTrashRetention(val);
    localStorage.setItem("gemini-trash-retention", val.toString());
    localStorage.setItem("gemini-visited-trash", "true");
    setHasVisitedTrash(true);
    setShowTrashModal(false);
  };

  // Switch animation
  useEffect(() => {
    if (activeNoteId && editorRef.current && statsRef.current) {
      gsap.fromTo(
        [editorRef.current, statsRef.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeNoteId]);

  // Counts for sidebar
  const counts = {
    all: notes.filter(n => !n.isTrash && !n.isArchived).length,
    favorites: notes.filter(n => n.isFavorite && !n.isTrash && !n.isArchived).length,
    trash: notes.filter(n => n.isTrash).length,
    archived: notes.filter(n => n.isArchived && !n.isTrash).length,
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading workspace...</p>
        </div>
      </div>
    );
  }

  const topFavorites = notes.filter(n => n.isFavorite && !n.isTrash).slice(0, 5);
  const seoData = calculateSeoScore(activeNote);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar 
        activeFolder={activeFolder} 
        counts={counts} 
        onFolderClick={handleFolderClick} 
        onNewNote={handleNewNote} 
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="search-bar">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search your notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <label className="search-toggle">
                <input type="checkbox" checked={includeArchivedInSearch} onChange={e => setIncludeArchivedInSearch(e.target.checked)} />
                Include Archived
              </label>
            )}
          </div>
          <div className="header-actions">
            {cloudSyncStatus && (
              <span title={cloudSyncStatus} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                <Cloud size={15} /> {cloudSyncStatus}
              </span>
            )}
            
            <button className="icon-btn" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} title="Toggle View">
              {viewMode === 'grid' ? <ListIcon size={18} /> : <GridIcon size={18} />}
            </button>

            {/* Quick Favorites Dropdown */}
            <div style={{position: 'relative'}}>
              <button className={`icon-btn ${showFavDropdown ? 'active' : ''}`} onClick={() => setShowFavDropdown(!showFavDropdown)} title="Top Favorites">
                <Star size={18} fill="#818cf8" color="#818cf8" />
              </button>
              {showFavDropdown && (
                <div className="dropdown-menu">
                  <h4 style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8}}>Quick Access</h4>
                  {topFavorites.length === 0 ? <p style={{fontSize: '0.8rem', color: '#94a3b8'}}>No favorites yet.</p> : null}
                  {topFavorites.map(f => (
                    <div key={f.id} className="dropdown-item" onClick={() => { setActiveNoteId(f.id); setShowFavDropdown(false); setActiveFolder('all'); }}>
                      {f.topic}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle Theme">
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link href="/dashboard/settings" className="icon-btn" title={cloudSyncStatus || "Account settings"}>
              <Settings size={18} />
            </Link>
          </div>
        </header>

        {/* Note Cards Row/List */}
        <section className={`notes-section ${!activeNote ? 'pad-closed' : ''}`}>
          <div className="notes-header">
            <h2 style={{textTransform: 'capitalize'}}>{activeFolder === 'all' ? 'All Notes' : activeFolder}</h2>
            {activeFolder === 'favorites' && (
              <button className="action-btn-text" onClick={exportFavorites}><Download size={16} /> Export All</button>
            )}
            {activeFolder === 'trash' && counts.trash > 0 && (
              <button className="action-btn-text danger" onClick={emptyTrash}><Trash size={16} /> Empty Trash</button>
            )}
          </div>
          
          <div className={`cards-container ${viewMode === 'list' ? 'list-view' : ''}`} ref={cardsRef}>
            {displayedNotes.map(note => (
              <div 
                key={note.id} 
                className={`note-card ${activeNoteId === note.id ? 'active' : ''} ${note.isFavorite ? 'favorite-glow' : ''}`}
                onClick={() => setActiveNoteId(note.id)}
              >
                <div className="card-header">
                  <FileText size={18} className="card-icon" />
                  <div className="card-actions">
                    {/* Quick Archive Action */}
                    {!note.isTrash && !note.isArchived && (
                      <button className="quick-action-btn" onClick={(e) => { e.stopPropagation(); toggleArchive(note.id); }} title="Quick Archive">
                        <Archive size={16} />
                      </button>
                    )}
                    {note.isFavorite && <Star size={16} className="star-active" />}
                  </div>
                </div>
                <h3>{note.topic}</h3>
                <p>{note.plainText || note.content.replace(/<[^>]*>?/gm, '')}</p>
                <div className="card-meta">
                  {new Date(note.timestamp).toLocaleDateString()} • {note.actualWords} words
                </div>
              </div>
            ))}
            {displayedNotes.length === 0 && (
              <p style={{color: '#94a3b8'}}>No notes found.</p>
            )}
          </div>
        </section>

        {/* Bottom Section (Editor + Stats) */}
        {activeNote ? (
          <section className="bottom-section">
            <div className="editor-container" ref={editorRef}>
              {activeNote.isArchived && (
                <div className="read-only-banner">Archived (Read-Only)</div>
              )}
              {activeNote.isTrash && (
                <div className="read-only-banner" style={{background: 'var(--danger)'}}>In Trash (Read-Only)</div>
              )}
              <div className="editor-header">
                <div className="editor-title">
                  <input 
                    type="text" 
                    value={activeNote.topic} 
                    onChange={handleTitleChange}
                    placeholder="Note Title..."
                    disabled={isReadOnly}
                  />
                </div>
                <div className="editor-actions">
                  {!activeNote.isTrash && (
                    <>
                      <button 
                        className={`action-btn ${activeNote.isFavorite ? 'active' : ''}`}
                        onClick={() => toggleFavorite(activeNote.id)}
                        title="Favorite"
                      >
                        <Star size={16} className={activeNote.isFavorite ? 'star-active' : 'star-inactive'} />
                      </button>
                      <button 
                        className={`action-btn ${activeNote.isArchived ? 'active' : ''}`}
                        onClick={() => toggleArchive(activeNote.id)}
                        title={activeNote.isArchived ? "Unarchive" : "Archive"}
                      >
                        {activeNote.isArchived ? <RotateCcw size={16} /> : <Archive size={16} />}
                      </button>
                      <button 
                        className="action-btn danger"
                        onClick={() => handleTrashNote(activeNote.id)}
                        title="Move to Trash"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  {activeNote.isTrash && (
                    <>
                      <button className="action-btn" onClick={() => restoreNote(activeNote.id)}><RotateCcw size={16} /> Restore</button>
                      <button className="action-btn danger" onClick={() => permDeleteNote(activeNote.id)}><XCircle size={16} /> Perm Delete</button>
                    </>
                  )}
                </div>
              </div>
              <Editor content={activeNote.content} onChange={handleEditorChange} editable={!isReadOnly} />
            </div>

            <div className="stats-panel" ref={statsRef}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                <h3>Statistics</h3>
                <BarChart2 size={18} color="#94a3b8" />
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--accent)'}}>W</div>
                <div className="stat-info">
                  <span className="stat-label">Words</span>
                  <span className="stat-value">{activeNote.actualWords}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--success)'}}>C</div>
                <div className="stat-info">
                  <span className="stat-label">Characters</span>
                  <span className="stat-value">{(activeNote.plainText || activeNote.content.replace(/<[^>]*>?/gm, '')).length}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--warning)'}}>T</div>
                <div className="stat-info">
                  <span className="stat-label">Reading Time</span>
                  <span className="stat-value">{Math.max(1, Math.ceil(activeNote.actualWords / 200))} min</span>
                </div>
              </div>
              
              {/* SEO Analyzer Card */}
              <div className="seo-analyzer" style={{marginTop: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--panel-border)'}}>
                <div style={{padding: '16px', borderBottom: '1px solid var(--panel-border)'}}>
                  <h4 style={{margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px'}}><Search size={16} color="var(--accent)" /> SEO Score: {seoData.score}/100</h4>
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-color)', padding: '8px 12px', borderRadius: '8px'}}>
                    <Tag size={14} color="var(--text-secondary)" />
                    <input 
                      type="text" 
                      value={activeNote.keywords || ''} 
                      onChange={handleKeywordChange}
                      placeholder="Add target keywords (comma separated)"
                      disabled={isReadOnly}
                      style={{border: 'none', background: 'transparent', flex: 1, fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none', width: '100%'}}
                    />
                  </div>
                </div>
                
                <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  {seoData.details.map((detail, idx) => (
                    <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: detail.passed ? '#16a34a' : '#dc2626'}}>
                      {detail.passed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span style={{color: 'var(--text-primary)'}}>{detail.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      {/* Modals */}
      {showTrashModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Trash Settings</h2>
            <p>How long should notes stay in the trash before being permanently deleted?</p>
            <select value={trashRetention} onChange={(e) => setTrashRetention(parseInt(e.target.value))}>
              <option value={7}>1 Week</option>
              <option value={14}>2 Weeks</option>
              <option value={28}>4 Weeks</option>
              <option value={30}>30 Days (Default)</option>
            </select>
            <div className="modal-actions">
              <button className="primary" onClick={() => saveTrashSettings(trashRetention)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
