import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useEffect } from 'react';
import { Editor } from '@/components';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Decoration, ViewPlugin, EditorView, ViewUpdate } from '@codemirror/view';
import { RangeSet } from '@codemirror/state';

interface Match {
    match: string;
    groups: string[];
    index: number;
}

const createHighlightPlugin = (matches: Match[]) => {
    return ViewPlugin.fromClass(class {
        decorations: RangeSet<Decoration>;

        constructor(_: EditorView) {
            let decorations: RangeSet<Decoration> = RangeSet.empty;

            matches.forEach((match) => {
                const from = match.index;
                const to = from + match.match.length;

                // Add decoration for the full match
                decorations = decorations.update({
                    add: [{
                        from,
                        to,
                        value: Decoration.mark({
                            class: 'has-background-primary-light has-text-primary',
                        })
                    }]
                });

                // Add decorations for groups
                match.groups.forEach((group, _) => {
                    const groupFrom = from + match.match.indexOf(group);
                    const groupTo = groupFrom + group.length;

                    decorations = decorations.update({
                        add: [{
                            from: groupFrom,
                            to: groupTo,
                            value: Decoration.mark({
                                class: 'has-background-info-light has-text-info',
                            })
                        }]
                    });
                });
            });

            this.decorations = decorations;
        }

        update(update: ViewUpdate) {
            if (update.docChanged) {
                this.decorations = this.decorations.map(update.changes);
            }
        }

        decorate() {
            return this.decorations;
        }
    }, {
        decorations: v => v.decorate(),
    });
};

export const Route = createLazyFileRoute('/regex')({
    component: RouteComponent,
})

function RouteComponent() {
    usePageTitle("Regex Tester");
    const [pattern, setPattern] = useState('');
    const [testString, setTestString] = useState('');
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [flags, setFlags] = useState({
        global: true,
        caseInsensitive: false,
        multiline: false,
        dotAll: false,
        sticky: false,
        unicode: false
    });

    const updateMatches = useCallback(() => {
        try {
            setError(null);
            if (!pattern) {
                setMatches([]);
                return;
            }

            const flagString = Object.entries(flags)
                .filter(([_, value]) => value)
                .map(([key]) => {
                    switch (key) {
                        case 'global': return 'g';
                        case 'caseInsensitive': return 'i';
                        case 'multiline': return 'm';
                        case 'dotAll': return 's';
                        case 'sticky': return 'y';
                        case 'unicode': return 'u';
                        default: return '';
                    }
                })
                .join('');

            const regex = new RegExp(pattern, flagString);
            const results: Match[] = [];
            let match;

            if (flags.global) {
                while ((match = regex.exec(testString)) !== null) {
                    results.push({
                        match: match[0],
                        groups: match.slice(1),
                        index: match.index
                    });
                }
            } else {
                match = regex.exec(testString);
                if (match) {
                    results.push({
                        match: match[0],
                        groups: match.slice(1),
                        index: match.index
                    });
                }
            }

            setMatches(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid regex pattern');
            setMatches([]);
        }
    }, [pattern, testString, flags]);

    const handlePatternChange = useCallback((value: string) => {
        setPattern(value);
        // Debounce the update to prevent too many regex operations
        const timeoutId = setTimeout(() => {
            updateMatches();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [updateMatches]);

    const handleTestStringChange = useCallback((value: string) => {
        setTestString(value);
        // Debounce the update to prevent too many regex operations
        const timeoutId = setTimeout(() => {
            updateMatches();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [updateMatches]);

    const toggleFlag = useCallback((flag: keyof typeof flags) => {
        setFlags(prev => ({
            ...prev,
            [flag]: !prev[flag]
        }));
    }, []);

    // Initial update
    useEffect(() => {
        updateMatches();
    }, [updateMatches]);

    return (
        <div className="fixed-grid has-2-columns">
            <div className="grid">

                {/* Left column - Input */}
                <div className="cell box">
                    <div className="field">
                        <label className="label">Pattern</label>
                        <div className="control">
                            <input
                                type="text"
                                className={`input ${error ? 'is-danger' : ''}`}
                                value={pattern}
                                onChange={(e) => handlePatternChange(e.target.value)}
                                placeholder="Enter regex pattern"
                            />
                        </div>
                        {error && <p className="help is-danger">{error}</p>}
                    </div>
                    <div className="field">
                        <label className="label">Flags</label>
                        <div className="buttons">
                            <button
                                className={`button is-small ${flags.global ? 'is-primary' : ''}`}
                                onClick={() => toggleFlag('global')}
                            >
                                Global (g)
                            </button>
                            <button
                                className={`button is-small ${flags.caseInsensitive ? 'is-primary' : ''}`}
                                onClick={() => toggleFlag('caseInsensitive')}
                            >
                                Case Insensitive (i)
                            </button>
                            <button
                                className={`button is-small ${flags.multiline ? 'is-primary' : ''}`}
                                onClick={() => toggleFlag('multiline')}
                            >
                                Multiline (m)
                            </button>
                            <button
                                className={`button is-small ${flags.dotAll ? 'is-primary' : ''}`}
                                onClick={() => toggleFlag('dotAll')}
                            >
                                Dot All (s)
                            </button>
                            <button
                                className={`button is-small ${flags.sticky ? 'is-primary' : ''}`}
                                onClick={() => toggleFlag('sticky')}
                            >
                                Sticky (y)
                            </button>
                            <button
                                className={`button is-small ${flags.unicode ? 'is-primary' : ''}`}
                                onClick={() => toggleFlag('unicode')}
                            >
                                Unicode (u)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right column - Results */}
                <div className="cell is-row-span-2">
                    <h2 className="title is-4">Matches</h2>
                    {matches.length === 0 ? (
                        <p className="has-text-grey">No matches found</p>
                    ) : (
                        <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                            {matches.map((match, index) => (
                                <div key={index} className="box has-background mb-2">
                                    <div className="level is-mobile mb-2">
                                        <div className="level-left">
                                            <div className="level-item">
                                                <span className="tag is-primary">Match {index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="level-right">
                                            <div className="level-item">
                                                <span className="tag is-info">Index: {match.index}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="has-background-dark">
                                            <strong className="has-text-primary">Match:</strong> {match.match}
                                        </div>
                                        {match.groups.length > 0 && (
                                            <div className="mt-2">
                                                <strong className="has-text-primary">Groups:</strong>
                                                {match.groups.map((group, groupIndex) => (
                                                    <div key={groupIndex} className="box has-background-dark mt-2">
                                                        <span className="has-text-info">Group {groupIndex + 1}:</span> {group}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom column - Test String */}
                <div className="cell box">
                    <Editor
                        title="Test String"
                        value={testString}
                        onChange={handleTestStringChange}
                        placeholder="Enter text to test against the pattern"
                        extensions={[createHighlightPlugin(matches)]}
                    />
                </div>
            </div>
        </div>
    );
}
