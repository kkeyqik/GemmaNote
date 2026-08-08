"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Settings, Sun, Moon, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [trashRetention, setTrashRetention] = useState(30);

  useEffect(() => {
    const savedTheme = localStorage.getItem("gemini-theme");
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
    
    const retention = localStorage.getItem("gemini-trash-retention");
    if (retention) setTrashRetention(parseInt(retention));
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem("gemini-theme", "dark");
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem("gemini-theme", "light");
    }
  };

  const saveTrashSettings = (val: number) => {
    setTrashRetention(val);
    localStorage.setItem("gemini-trash-retention", val.toString());
  };

  return (
    <div className="dashboard">
      <Sidebar activeFolder="settings" />
      
      <main className="main-content">
        <header className="header" style={{ minHeight: '44px' }}>
          {/* Header empty space to align with main page */}
        </header>

        <section className="notes-section">
          <div className="notes-header">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} /> Settings
            </h2>
          </div>
          
          <div className="settings-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
            
            {/* Appearance */}
            <div className="setting-card" style={{ background: 'var(--panel-bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--panel-border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem' }}>
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />} Appearance
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Dark Mode</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Toggle dark mode for the application.</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={isDarkMode} 
                    onChange={(e) => toggleTheme(e.target.checked)} 
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                  />
                </label>
              </div>
            </div>

            {/* Trash Management */}
            <div className="setting-card" style={{ background: 'var(--panel-bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--panel-border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem' }}>
                <Trash2 size={18} /> Trash Retention
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Empty Trash After</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>How long should notes stay in the trash before being permanently deleted?</div>
                </div>
                <select 
                  value={trashRetention} 
                  onChange={(e) => saveTrashSettings(parseInt(e.target.value))}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                >
                  <option value={7}>1 Week</option>
                  <option value={14}>2 Weeks</option>
                  <option value={28}>4 Weeks</option>
                  <option value={30}>30 Days (Default)</option>
                </select>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
