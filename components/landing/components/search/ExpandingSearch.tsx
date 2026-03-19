'use client';
import { useState, useEffect, useId } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchDialog } from './SearchDialog';
import { cn } from '../ui/utils';

interface ExpandingSearchProps {
    onNavigate?: (page: string, slug?: string) => void;
    className?: string;
    iconClassName?: string;
    inputClassName?: string;
}

export function ExpandingSearch({ 
    onNavigate, 
    className,
    iconClassName = "w-4 h-4",
    inputClassName = "w-40 text-sm"
}: ExpandingSearchProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState("");
    const id = useId();

    useEffect(() => {
        const handleExpand = (e: CustomEvent) => {
            if (e.detail.id !== id) {
                setIsExpanded(false);
            }
        };

        window.addEventListener('search-expanded', handleExpand as EventListener);
        return () => window.removeEventListener('search-expanded', handleExpand as EventListener);
    }, [id]);

    const handleSearchSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsSearchOpen(true);
        }
    };

    const toggleExpand = () => {
        if (!isExpanded) {
            window.dispatchEvent(new CustomEvent('search-expanded', { detail: { id } }));
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <SearchDialog 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
                onNavigate={onNavigate || (() => {})} 
                initialQuery={query}
            />
            <motion.div 
                className={cn("flex items-center gap-2", className)}
                initial={false}
            >
                <div 
                    onClick={toggleExpand}
                    className="cursor-pointer hover:text-gray-300 transition-colors"
                >
                    <Search className={iconClassName} />
                </div>
                
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <input 
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleSearchSubmit}
                                className={cn(
                                    "bg-transparent border-b border-gray-500 text-white focus:border-white focus:outline-none pb-1 font-sans",
                                    inputClassName
                                )}
                                autoFocus
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}