import React, { useEffect, useRef, useState } from "react";
import { Link } from '@tanstack/react-router';
import cls from "classnames";
import { ROUTE_CONFIG } from '@/routes.config';
import { isTyping } from "@/libs/helpers";

export const SearchModal = () => {
  const [show, setShow] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Array<typeof ROUTE_CONFIG[0]>>([]);

  useEffect(() => {
    const searchToolRegistry = (event: KeyboardEvent) => {
      event.stopPropagation();

      const keyCode = event.key;

      if (keyCode === 'Escape') {
        setShow(false);
        setKeyword('');
        return;
      }
      
      if (keyCode === 'f' && !isTyping()) {
        setShow(true);
        return
      }
    };

    document.addEventListener('keydown', searchToolRegistry);

    return () => {
      document.removeEventListener('keydown', searchToolRegistry);
    }
  }, []);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    const results = ROUTE_CONFIG.filter((route) => {
      return route.name.toLowerCase().includes(keyword.toLowerCase());
    }).slice(0, 5);

    setResults(results);
  }, [keyword]);

  return (
    <div style={{ justifyContent: 'initial'}} className={cls({
      'modal': true,
      'is-active': show,
    })}>
      <div className="modal-background"></div>

      <div className="modal-content" style={{ position: 'absolute', marginTop: '10%' }}>
        <div className="box" style={{minHeight: '400px'}}>
          <div className="control">
            <input 
              ref={inputRef} 
              className="input" 
              type="text" 
              onChange={onChange} 
              value={keyword} 
              defaultValue={keyword}
              placeholder="Search..."
            />
          </div>

          {results.length > 0 ? (
            
            <div className="mt-4">
              {results.map((route) => (
                <div key={route.name} className="box">
                  <Link to={route.path}>{route.name}</Link>
                </div>
              ))}
            </div>) : (
              <div className="is-flex is-justify-content-center mt-4">No results</div>
            )}
        </div>
      </div>

      <button className="modal-close is-large" onClick={() => setShow(false)}></button>
    </div>
  )
}

