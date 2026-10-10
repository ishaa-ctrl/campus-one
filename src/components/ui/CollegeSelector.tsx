'use client';

import { useState, useRef, useEffect, useMemo, KeyboardEvent } from 'react';
import { Search, X, Check, School, MapPin } from 'lucide-react';
import { searchColleges, type CollegeEntry } from '@/lib/indianColleges';

interface CollegeSelectorProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CollegeSelector({
  id = 'college-selector',
  value,
  onChange,
  placeholder = 'Search colleges across India (or type your own)...',
  disabled = false,
}: CollegeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync internal search query with incoming value when not open
  useEffect(() => {
    if (!open) {
      setQuery(value || '');
    }
  }, [value, open]);

  // Search colleges across India based on current query
  const filteredColleges = useMemo(() => {
    return searchColleges(query, 60);
  }, [query]);

  // Keep highlighted index in bounds
  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  // Auto-scroll highlighted option into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[highlighted + 1] as HTMLElement | undefined; // +1 for header
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  // Handle outside click / touch
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, []);

  const selectCollege = (college: CollegeEntry) => {
    onChange(college.name);
    setQuery(college.name);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    if (!open) setOpen(true);
  };

  const handleFocus = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        setHighlighted((h) => Math.min(h + 1, filteredColleges.length - 1));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && filteredColleges[highlighted]) {
        e.preventDefault();
        selectCollege(filteredColleges[highlighted]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const clearValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full" id={`${id}-container`}>
      <div className="relative">
        <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
        
        <input
          ref={inputRef}
          id={id}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          value={open ? query : value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${id}-dropdown`}
          className={[
            'input-field pl-11 pr-10 w-full transition-all duration-200 select-text',
            open ? 'ring-2 ring-campus-purple/30 border-campus-purple bg-white' : 'hover:border-campus-purple/40',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
        />

        {value && !disabled && (
          <button
            type="button"
            onClick={clearValue}
            aria-label="Clear college selection"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-campus-text-secondary hover:text-campus-danger hover:bg-campus-border/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && !disabled && (
        <div
          id={`${id}-dropdown`}
          role="region"
          aria-label="College suggestions"
          className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-campus-border rounded-xl shadow-dropdown overflow-hidden animate-fade-in"
        >
          {/* Header indicator */}
          <div className="px-3.5 py-2 text-xs text-campus-text-secondary border-b border-campus-border bg-campus-bg/40 flex items-center justify-between font-medium">
            <span>
              {query.trim()
                ? `${filteredColleges.length} college${filteredColleges.length !== 1 ? 's' : ''} found`
                : 'Top colleges across India — type to filter or enter your own'}
            </span>
            <span className="text-[11px] text-campus-purple font-normal">
              All India Support
            </span>
          </div>

          <ul
            role="listbox"
            ref={listRef}
            aria-label="Colleges"
            className="overflow-y-auto custom-scrollbar"
            style={{ maxHeight: '280px' }}
          >
            {filteredColleges.length === 0 ? (
              <li className="px-4 py-5 text-center text-sm text-campus-text-secondary">
                <p className="font-medium text-campus-text">No pre-listed college matches &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-campus-text-secondary mt-1">
                  You can keep typing above — your entered college name will still be saved for your account.
                </p>
              </li>
            ) : (
              filteredColleges.map((college, idx) => {
                const isSelected = college.name.toLowerCase() === value.toLowerCase();
                const isHighlighted = idx === highlighted;

                return (
                  <li
                    key={`${college.name}-${college.city}-${idx}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlighted(idx)}
                    onMouseDown={(e) => {
                      // Prevent input blur before click registers
                      e.preventDefault();
                      selectCollege(college);
                    }}
                    className={[
                      'px-4 py-2.5 cursor-pointer flex items-start justify-between gap-3 transition-colors duration-100',
                      isHighlighted && !isSelected ? 'bg-campus-purple-50' : '',
                      isSelected ? 'bg-campus-purple-light' : '',
                      !isHighlighted && !isSelected ? 'hover:bg-campus-bg' : '',
                    ].join(' ')}
                  >
                    <div className="flex-1 min-w-0">
                      <span
                        className={[
                          'block text-sm font-medium leading-snug break-words',
                          isSelected ? 'text-campus-purple' : 'text-campus-text',
                        ].join(' ')}
                      >
                        {college.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-campus-text-secondary leading-tight mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0 opacity-70" />
                        <span>{college.city}, {college.state}</span>
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-campus-purple shrink-0 mt-0.5" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
