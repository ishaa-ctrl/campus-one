'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface SearchableDropdownProps {
  id: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  noResultsText?: string;
  showFullLabel?: boolean;
}

export default function SearchableDropdown({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  disabled = false,
  noResultsText = 'No results found.',
  showFullLabel = false,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = query.trim()
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          (o.sublabel ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 30);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[highlighted] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, []);


  const select = useCallback(
    (opt: DropdownOption) => {
      onChange(opt.value);
      setOpen(false);
    },
    [onChange]
  );

  const handleTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[highlighted]) select(filtered[highlighted]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div ref={containerRef} className="relative w-full" id={id}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleTriggerKey}
        className={[
          'input-field pl-11 pr-10 text-left flex items-center gap-2 w-full min-h-[46px]',
          'transition-all duration-200 cursor-pointer select-none',
          open ? 'ring-2 ring-campus-purple/30 border-campus-purple' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-campus-purple/40',
          !selected ? 'text-campus-text-secondary/60' : 'text-campus-text',
        ].join(' ')}
      >
        <span
          className={[
            'flex-1 min-w-0 text-sm',
            showFullLabel ? 'whitespace-normal leading-tight py-0.5' : 'truncate',
          ].join(' ')}
        >
          {selected ? (
            <span className="flex flex-col">
              <span className="font-medium leading-tight">{selected.label}</span>
              {selected.sublabel && (
                <span className="text-xs text-campus-text-secondary leading-tight mt-0.5">
                  {selected.sublabel}
                </span>
              )}
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
        </span>

        <span className="flex items-center gap-1 shrink-0">
          {selected && (
            <span
              role="button"
              tabIndex={0}
              onClick={clearSelection}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onChange('');
                }
              }}
              className="p-0.5 rounded-full hover:bg-campus-border text-campus-text-secondary hover:text-campus-danger transition-colors"
              aria-label="Clear selection"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <ChevronDown
            className={[
              'w-4 h-4 text-campus-text-secondary transition-transform duration-200',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-campus-border rounded-xl shadow-dropdown flex flex-col overflow-hidden animate-fade-in"
          style={{ maxHeight: '320px' }}
          role="dialog"
        >
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-campus-border bg-campus-bg/40">
            <Search className="w-3.5 h-3.5 text-campus-text-secondary shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKey}
              placeholder={searchPlaceholder}
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-campus-text-secondary/60 text-campus-text"
              aria-label="Search options"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-campus-text-secondary hover:text-campus-text transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <ul
            id={`${id}-listbox`}
            ref={listRef}
            role="listbox"
            aria-label="Options"
            className="overflow-y-auto custom-scrollbar"
            style={{ maxHeight: '260px' }}
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-sm text-campus-text-secondary text-center">
                {noResultsText}
              </li>
            ) : (
              filtered.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlighted;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlighted(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      select(opt);
                    }}
                    onClick={() => select(opt)}
                    className={[
                      'px-4 py-2.5 cursor-pointer flex items-start gap-3 transition-colors duration-100',
                      isHighlighted && !isSelected ? 'bg-campus-purple-50' : '',
                      isSelected ? 'bg-campus-purple-light' : '',
                      !isHighlighted && !isSelected ? 'hover:bg-campus-bg' : '',
                    ].join(' ')}
                  >
                    <span className="flex-1 min-w-0">
                      <span
                        className={[
                          'block text-sm font-medium leading-snug break-words',
                          isSelected ? 'text-campus-purple' : 'text-campus-text',
                        ].join(' ')}
                      >
                        {opt.label}
                      </span>
                      {opt.sublabel && (
                        <span className="block text-xs text-campus-text-secondary leading-tight mt-0.5">
                          {opt.sublabel}
                        </span>
                      )}
                    </span>
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
