import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { NoteSidebar } from '@/components/Notes/NoteSidebar';
import { NoteEditor } from '@/components/Notes/NoteEditor';
import { Note } from '@/components/Notes/types'

export const Route = createFileRoute('/notes')({
  component: RouteComponent,
})

function RouteComponent() {
  usePageTitle("Notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!selectedNote) return;

    setSaveStatus('saving');
    const timeoutId = setTimeout(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [notes, selectedNote]);

  return (
    <div className="h-100">
      <NoteSidebar setIsPreview={setIsPreview} onSelectNote={setSelectedNote} notes={notes} setNotes={setNotes} />
      <NoteEditor selectedNote={selectedNote} setSelectedNote={setSelectedNote} isPreview={isPreview} setIsPreview={setIsPreview} saveStatus={saveStatus} setNotes={setNotes} />
    </div>
  );
}
