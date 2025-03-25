import { useState, useCallback, useEffect } from 'react';
import {
    FaPlus,
    FaTrash,
    FaSearch,
    FaTag,
} from 'react-icons/fa';
import styles from './NoteSidebar.module.css';


interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

interface Props {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    setIsPreview: (isPreview: boolean) => void;
    onSelectNote?: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const NoteSidebar = ({ setIsPreview, onSelectNote, notes, setNotes }: Props) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const createNewNote = useCallback(() => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: searchQuery || 'New Note',
            content: `${searchQuery || 'New Note'}\n\n#untagged`,
            tags: ['untagged'],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        setNotes(prev => [...prev, newNote]);
        setSelectedNote(newNote);
        setSearchQuery(''); // Clear the search after creating note
    }, [searchQuery, setNotes, setSelectedNote]);

    const formatDate = useCallback((timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    }, []);

    const deleteNote = useCallback((noteId: string) => {
        setNotes(prev => prev.filter(note => note.id !== noteId));
        if (selectedNote?.id === noteId) {
            setSelectedNote(null);
        }
    }, [selectedNote, setNotes]);

    useEffect(() => {
        if (!selectedNote) return;
        onSelectNote?.(selectedNote);
    }, [selectedNote, onSelectNote]);

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
    return (
        <div className={styles.sidebar}>
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

                <div className={styles.noteList}>
                    {filteredNotes().length === 0 ? (
                        <div className="has-text-centered py-4">
                            <p className="has-text-grey-light mb-3">No notes found</p>
                            <button
                                className="button is-primary is-small"
                                onClick={createNewNote}
                            >
                                <span className="icon">
                                    <FaPlus />
                                </span>
                                <span>Create New Note</span>
                            </button>
                        </div>
                    ) : (
                        filteredNotes().map(note => (
                            <div
                                key={note.id}
                                className={`box is-shadowless mb-2 p-2 ${styles.noteItem} ${selectedNote?.id === note.id ? styles.noteItemActive : ''
                                    }`}
                                onClick={() => {
                                    setSelectedNote(note);
                                    setIsPreview(true);
                                }}
                            >
                                <div className="level is-mobile">
                                    <div className="level-left">
                                        <div className="level-item">
                                            <div>
                                                <p className={`${styles.noteTitle} has-text-weight-medium`}>{note.title}</p>
                                                <p className={`${styles.noteTime} is-size-7 has-text-grey`}>
                                                    {formatDate(note.updatedAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="level-right">
                                        <div className="level-item">
                                            <button
                                                className="button is-small is-ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNote(note.id);
                                                }}
                                            >
                                                <span className="icon is-small has-text-grey-light">
                                                    <FaTrash />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}