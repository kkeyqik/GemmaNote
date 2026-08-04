import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  topic: string;
  minWords: number;
  actualWords: number;
  content: string;
  plainText: string;
  keywords: string;
  timestamp: number;
  isFavorite: boolean;
  isTrash: boolean;
  isArchived: boolean;
  trashedAt?: number;
}

interface EditorState {
  notes: Note[];
  activeNoteId: string | null;
  activeFolder: 'all' | 'favorites' | 'trash' | 'archived';
  isDarkMode: boolean;
  setNotes: (notes: Note[] | ((prev: Note[]) => Note[])) => void;
  setActiveNoteId: (id: string | null) => void;
  setActiveFolder: (folder: 'all' | 'favorites' | 'trash' | 'archived') => void;
  setIsDarkMode: (isDark: boolean) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,
      activeFolder: 'all',
      isDarkMode: false,
      setNotes: (updater) => set((state) => ({ 
        notes: typeof updater === 'function' ? updater(state.notes) : updater 
      })),
      setActiveNoteId: (id) => set({ activeNoteId: id }),
      setActiveFolder: (folder) => set({ activeFolder: folder }),
      setIsDarkMode: (isDark) => set({ isDarkMode: isDark }),
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      updateNote: (id, data) => set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? { ...n, ...data } : n)),
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((n) => n.id !== id),
      })),
    }),
    {
      name: 'gemini-notes-storage', // unique name for localStorage key
    }
  )
);
