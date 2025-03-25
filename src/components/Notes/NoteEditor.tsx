import styles from './NoteEditor.module.css';
import { markdown } from '@codemirror/lang-markdown';
import {
    FaEdit,
    FaEye
} from 'react-icons/fa';
import { Editor } from '@/components';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useCallback } from 'react';
import { Note } from './types';

interface Props {
    selectedNote: Note | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
    isPreview: boolean;
    setIsPreview: (isPreview: boolean) => void;
    saveStatus: string | null;
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const NoteEditor = ({ selectedNote, setSelectedNote, isPreview, setIsPreview, saveStatus, setNotes }: Props) => {
    const extractTitle = useCallback((content: string): string => {
        const firstLine = content.split('\n')[0];
        return firstLine || 'Untitled';
    }, []);


    const renderMarkdown = useCallback((content: string) => {
        const html = marked.parse(content) as string;
        return DOMPurify.sanitize(html);
    }, []);

    const extractTags = useCallback((content: string): string[] => {
        const lines = content.split('\n');
        const lastLine = lines[lines.length - 1];
        const tagMatches = lastLine.match(/#[\w-]+/g) || [];
        return tagMatches.map(tag => tag.slice(1));
    }, []);

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
    }, [selectedNote, extractTitle, extractTags, setNotes, setSelectedNote]);

    return (
        <div className={styles.content}>
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
    );
}