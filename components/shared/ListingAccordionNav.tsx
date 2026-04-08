'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export interface AccordionRecord {
  id: string | number;
  slug: string;
  title: string;
}

export interface AccordionSection {
  id: string;
  label: string;
  records: AccordionRecord[];
}

interface ListingAccordionNavProps {
  sections: AccordionSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onRecordClick: (slug: string) => void;
}

export function ListingAccordionNav({
  sections,
  activeSection,
  onSectionClick,
  onRecordClick,
}: ListingAccordionNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(activeSection);

  const handleSectionClick = (sectionId: string) => {
    setExpandedSection(prev => (prev === sectionId ? null : sectionId));
    onSectionClick(sectionId);
  };

  return (
    <nav className="md:sticky md:top-32 flex flex-col items-start gap-1">
      {sections.map((section) => {
        const isExpanded = expandedSection === section.id;
        const isActive = activeSection === section.id;

        return (
          <div key={section.id} className="w-full">
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center justify-between w-full text-left text-xl md:text-2xl font-normal transition-all duration-300 py-1 ${
                isActive ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            >
              <span>{section.label}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pb-2">
                    {section.records.length > 0 ? (
                      section.records.map((record) => (
                        <button
                          key={record.slug}
                          onClick={() => onRecordClick(record.slug)}
                          className="pl-4 md:pl-6 text-left text-base md:text-lg font-normal text-gray-500 hover:text-black transition-colors duration-200 leading-snug py-0.5"
                        >
                          {record.title}
                        </button>
                      ))
                    ) : (
                      <span className="pl-4 md:pl-6 text-base md:text-lg text-gray-300 py-0.5">—</span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
