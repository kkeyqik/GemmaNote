import React from 'react';
import { PenSquare, Plus, LayoutGrid, Star, Trash2, Archive, Download } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export type Counts = {
  all: number;
  favorites: number;
  trash: number;
  archived: number;
};

interface SidebarProps {
  activeFolder?: string;
  counts?: Counts;
  onFolderClick?: (folder: string) => void;
  onNewNote?: () => void;
}

export default function Sidebar({
  activeFolder = '',
  counts = { all: 0, favorites: 0, trash: 0, archived: 0 },
  onFolderClick,
  onNewNote
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isSettingsPage = pathname === '/settings';

  const handleFolderClick = (folder: string) => {
    if (isSettingsPage) {
      // If we are on the settings page, go back to the dashboard
      router.push('/');
    } else if (onFolderClick) {
      onFolderClick(folder);
    }
  };

  const handleNewNote = () => {
    if (isSettingsPage) {
      router.push('/');
    } else if (onNewNote) {
      onNewNote();
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => isSettingsPage ? router.push('/') : null}>
        <div className="logo-icon"><PenSquare size={20} /></div>
        GemmaNote
      </div>
      
      <button className="new-note-btn" onClick={handleNewNote}>
        <Plus size={18} /> New Note
      </button>

      <nav className="nav-menu">
        <ul>
          <li className={`nav-item ${activeFolder === 'all' && !isSettingsPage ? 'active' : ''}`} onClick={() => handleFolderClick('all')}>
            <div className="nav-item-left"><LayoutGrid size={18} /> All Notes</div>
            {!isSettingsPage && <span className="badge">{counts.all}</span>}
          </li>
          <li className={`nav-item ${activeFolder === 'favorites' && !isSettingsPage ? 'active' : ''}`} onClick={() => handleFolderClick('favorites')}>
            <div className="nav-item-left"><Star size={18} /> Favorites</div>
            {!isSettingsPage && <span className="badge">{counts.favorites}</span>}
          </li>
          <li className={`nav-item ${activeFolder === 'trash' && !isSettingsPage ? 'active' : ''}`} onClick={() => handleFolderClick('trash')}>
            <div className="nav-item-left"><Trash2 size={18} /> Trash</div>
            {!isSettingsPage && <span className="badge">{counts.trash}</span>}
          </li>
          <li className={`nav-item ${activeFolder === 'archived' && !isSettingsPage ? 'active' : ''}`} onClick={() => handleFolderClick('archived')}>
            <div className="nav-item-left"><Archive size={18} /> Archived</div>
            {!isSettingsPage && <span className="badge">{counts.archived}</span>}
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', padding: '0 24px 24px 24px' }}>
        <a href="/extension.zip" download className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '100%', textDecoration: 'none', background: 'var(--accent)', color: '#fff', borderRadius: '8px', padding: '10px' }}>
          <Download size={16} /> Get Extension
        </a>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '8px' }}>
          Unzip and load unpacked in Chrome
        </p>
      </div>
    </aside>
  );
}
