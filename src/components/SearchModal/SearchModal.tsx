import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link } from '@tanstack/react-router';
import cls from "classnames";
import { ROUTE_CONFIG } from '@/routes.config';
import { isTyping } from "@/libs/helpers";


export const SearchModal = () => {
  const [{ show, keyword }, setState] = useState({ show: false, keyword: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyboardEvents = useCallback((event: KeyboardEvent) => {
    event.stopPropagation();

    switch (event.key) {
      case 'Escape':
        setState(prev => ({ ...prev, show: false, keyword: '' }));
        break;
      case 'f':
        if (!isTyping() && !show) {
          event.preventDefault();
          setState(prev => ({ ...prev, show: true }));
        }
        break;
    }
  }, [show]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardEvents);
    return () => document.removeEventListener('keydown', handleKeyboardEvents);
  }, [handleKeyboardEvents]);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setState(prev => ({ ...prev, keyword: event.target.value }));
  }, []);

  const handleClose = useCallback(() => {
    setState(prev => ({ ...prev, show: false }));
  }, []);

  const results = useMemo(() => {
    if (!keyword) return [];
    return ROUTE_CONFIG
      .filter((route) => route.name.toLowerCase().includes(keyword.toLowerCase()))
      .slice(0, 5);
  }, [keyword]);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Search routes"
      style={{ justifyContent: 'initial'}} 
      className={cls('modal', { 'is-active': show })}
    >
      <div className="modal-background" onClick={handleClose}></div>

      <div className="modal-content" style={{ position: 'absolute', marginTop: '10%' }}>
        <div className="box" style={{minHeight: '400px'}}>
          <div className="control">
            <input 
              ref={inputRef} 
              className="input" 
              type="text" 
              onChange={handleChange} 
              value={keyword} 
              placeholder="Search..."
              aria-label="Search input"
            />
          </div>

          <div className="mt-4">
            {results.length > 0 ? (
              results.map((route) => (
                <div key={route.name} className="box">
                  <Link to={route.path}>{route.name}</Link>
                </div>
              ))
            ) : (
              <div className="is-flex is-justify-content-center">
                {keyword ? 'No results' : 'Start typing to search'}
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        className="modal-close is-large" 
        onClick={handleClose}
        aria-label="Close search"
      />
    </div>
  );
}

