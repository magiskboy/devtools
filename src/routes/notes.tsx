import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@/components';
import { usePageTitle } from '@/hooks/usePageTitle';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import styles from './notes.module.css';
import { markdown } from '@codemirror/lang-markdown';

// Icons
import { 
  FaPlus, 
  FaTrash, 
  FaSearch, 
  FaTag, 
  FaClock,
  FaEdit,
  FaEye
} from 'react-icons/fa';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export const Route = createFileRoute('/notes')({
  component: RouteComponent,
})

function RouteComponent() {
  usePageTitle("Notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

  // Extract tags from content
  const extractTags = useCallback((content: string): string[] => {
    const lines = content.split('\n');
    const lastLine = lines[lines.length - 1];
    const tagMatches = lastLine.match(/#[\w-]+/g) || [];
    return tagMatches.map(tag => tag.slice(1));
  }, []);

  // Extract title from content
  const extractTitle = useCallback((content: string): string => {
    const firstLine = content.split('\n')[0];
    return firstLine || 'Untitled';
  }, []);

  // Get all unique tags
  const allTags = useCallback(() => {
    const tags = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [notes]);

  // Filter notes based on search query and selected tag
  const filteredNotes = useCallback(() => {
    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || note.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, selectedTag]);

  const handleNoteChange = useCallback((content: string) => {
    if (!selectedNote) return;

    const title = extractTitle(content);
    const tags = extractTags(content);
    const updatedNote = {
      ...selectedNote,
      title,
      content,
      tags,
      updatedAt: Date.now()
    };

    setNotes(prev => prev.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ));
    setSelectedNote(updatedNote);
  }, [selectedNote, extractTitle, extractTags]);

  const createNewNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'New Note\n\n#untagged',
      tags: ['untagged'],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setNotes(prev => [...prev, newNote]);
    setSelectedNote(newNote);
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  }, [selectedNote]);

  const renderMarkdown = useCallback((content: string) => {
    const html = marked.parse(content) as string;
    return DOMPurify.sanitize(html);
  }, []);

  const formatDate = useCallback((timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  }, []);

  return (
    <div className="columns is-gapless h-100">
      <div className="column is-3">
        <div className="box is-shadowless">
          <div className="field has-addons mb-3">
            <div className="control has-icons-left is-expanded">
              <input
                type="text"
                className="input is-small"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="icon is-small is-left">
                <FaSearch />
              </span>
            </div>
            <div className="control">
              <button 
                className="button is-primary is-small"
                onClick={createNewNote}
              >
                <span className="icon">
                  <FaPlus />
                </span>
              </button>
            </div>
          </div>

          <div className="tags mb-3">
            <span className={`tag is-light ${!selectedTag ? 'is-primary' : ''}`}>
              <span className="icon is-small">
                <FaTag />
              </span>
              <span>All</span>
            </span>
            {allTags().map(tag => (
              <span
                key={tag}
                className={`tag ${selectedTag === tag ? 'is-primary' : 'is-light'}`}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon is-small">
                  <FaTag />
                </span>
                <span>{tag}</span>
              </span>
            ))}
          </div>

          <div className="note-list">
            {filteredNotes().map(note => (
              <div
                key={note.id}
                className={`box is-shadowless mb-2 p-2 ${styles.noteItem} ${
                  selectedNote?.id === note.id ? styles.noteItemActive : ''
                }`}
                onClick={() => setSelectedNote(note)}
              >
                <div className="level is-mobile mb-2">
                  <div className="level-left">
                    <div className="level-item">
                      <p className={`${styles.noteTitle} has-text-weight-medium`}>{note.title}</p>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <button
                        className="button is-small is-danger is-light"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                      >
                        <span className="icon is-small">
                          <FaTrash />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`${styles.noteTags} tags are-small`}>
                  {note.tags.map(tag => (
                    <span key={tag} className="tag is-light">
                      <span className="icon is-small">
                        <FaTag />
                      </span>
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                <div className={`${styles.noteMeta} is-size-7 has-text-grey-light`}>
                  <span className="icon is-small">
                    <FaClock />
                  </span>
                  <span>{formatDate(note.updatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="column">
        <div className="box is-shadowless h-100">
          {selectedNote ? (
            <>
              <div className="level is-mobile mb-3">
                <div className="level-left">
                  <div className="level-item">
                    <div className="buttons has-addons">
                      <button
                        className={`button is-small ${!isPreview ? 'is-primary' : ''}`}
                        onClick={() => setIsPreview(false)}
                      >
                        <span className="icon is-small">
                          <FaEdit />
                        </span>
                      </button>
                      <button
                        className={`button is-small ${isPreview ? 'is-primary' : ''}`}
                        onClick={() => setIsPreview(true)}
                      >
                        <span className="icon is-small">
                          <FaEye />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    {saveStatus && (
                      <span className={`tag ${saveStatus === 'saving' ? 'is-warning' : 'is-success'}`}>
                        {saveStatus === 'saving' ? 'Saving...' : 'Saved'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {isPreview ? (
                <div 
                  className={`${styles.preview} has-text-light`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedNote.content) }}
                />
              ) : (
                <Editor
                  title={selectedNote.title}
                  value={selectedNote.content}
                  onChange={handleNoteChange}
                  placeholder="Start writing your note..."
                  extensions={[markdown()]}
                />
              )}
            </>
          ) : (
            <div className="has-text-centered has-text-grey-light">
              <p>Select a note or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
