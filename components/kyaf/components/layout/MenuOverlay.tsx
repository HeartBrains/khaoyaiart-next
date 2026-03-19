'use client';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ASSETS as ROOT_ASSETS } from '@/utils/assets';
import { ASSETS } from '@/components/kyaf/utils/assets';
import { ExpandingSearch } from '../search/ExpandingSearch';
import { useLanguage } from '@/utils/languageContext';
import { siteConfig, isMenuVisible, isSectionVisible } from '@/utils/siteConfig';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, slug?: string, backTo?: any, section?: string) => void;
  activePage: string;
}

interface MenuItem {
    label: string;
    page: string;
    section?: string;
    children?: MenuItem[];
    externalUrl?: string;
}

export function MenuOverlay({ isOpen, onClose, onNavigate, activePage }: MenuOverlayProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { language, setLanguage, t } = useLanguage();

  const toggleExpand = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  // Dynamic sitemap based on current language
  const sitemap: MenuItem[] = [
    { label: t('nav.home'), page: 'home' },
    { label: t('nav.visit'), page: 'visit' },
    { 
      label: t('nav.exhibitions'), 
      page: 'exhibitions',
      children: [
          { label: t('exhibitions.current'), page: 'exhibitions', section: 'current' },
          { label: t('exhibitions.upcoming'), page: 'exhibitions', section: 'upcoming' },
          { label: t('exhibitions.past'), page: 'exhibitions', section: 'past' },
      ]
    },
    {
        label: t('nav.activities'),
        page: 'activities',
        children: [
            { label: t('activities.current'), page: 'activities', section: 'current' },
            { label: t('activities.upcoming'), page: 'activities', section: 'upcoming' },
            { label: t('activities.past'), page: 'activities', section: 'past' },
        ]
    },
    {
        label: t('nav.residency'),
        page: 'residency',
        children: [
            { label: t('residency.currentArtists'), page: 'residency', section: 'current' },
            { label: t('residency.pastArtists'), page: 'residency', section: 'past' },
        ]
    },
    { label: t('nav.blog'), page: 'blog' },
    { label: t('nav.aboutUs'), page: 'about' },
    { label: t('nav.team'), page: 'team' },
    { label: t('nav.booking'), page: '', externalUrl: 'https://www.tickettailor.com/events/khaoyaiart' },
    {
        label: t('nav.shop'),
        page: 'shop',
        children: [
            { label: 'Bookings', page: 'shop' },
            { label: 'Products', page: 'shop' },
        ]
    },
    {
        label: t('nav.archives'),
        page: 'archives',
        children: [
            { label: t('exhibitions.past'), page: 'archives' },
            { label: 'Past Activities', page: 'archives' },
        ]
    },
    { label: t('nav.contact'), page: 'contact' },
  ];

  // Map page names to menu config keys
  const pageToMenuKey: Record<string, keyof typeof siteConfig.menu | null> = {
    'home': 'home',
    'visit': 'visit',
    'exhibitions': 'exhibitions',
    'activities': 'activities',
    'residency': 'residency',
    'blog': 'blog',
    'about': 'about',
    'team': 'team',
    'shop': 'shop',
    'archives': 'archives',
    'contact': 'contact',
    '': null, // for external links like booking
  };

  // Filter sitemap based on visibility settings
  const visibleSitemap = sitemap.filter(item => {
    // For external links (like Booking), check if we should show it
    // Booking is shown when menu.shop is true (as per requirements)
    if (item.externalUrl && item.label === t('nav.booking')) {
      // Show booking link separately - it's always visible when configured
      return true; 
    }
    
    const menuKey = pageToMenuKey[item.page];
    if (menuKey === null) return true; // Show external links
    
    return isMenuVisible(menuKey);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex text-white font-sans"
        >
          {/* Left Image Side - Hidden on Mobile */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="hidden md:block w-1/2 h-full relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${ASSETS.LANDING_BUILDING})`, filter: 'saturate(0) brightness(0.85)' }}
              onClick={onClose}
            />

          </motion.div>

          {/* Right Content Side */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 h-full bg-black flex flex-col relative overflow-y-auto"
            onClick={onClose}
          >
             {/* Close Button */}
             <div className="absolute top-[calc(8vh+15px)] right-[6vw] z-20">
                <button onClick={onClose} className="hover:opacity-70 transition-opacity duration-300">
                    <X className="w-6 h-6 text-white" />
                </button>
             </div>

             {/* Navigation Links Container */}
             <motion.div 
                className="flex-1 flex flex-col px-[6vw] py-[8vh] bg-black/60"
                onClick={(e) => e.stopPropagation()}
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.3
                        }
                    }
                }}
             >
                <div className="flex-1 flex flex-col gap-2 px-[0px] py-[0.18px] pt-[15px] pr-[0px] pb-[0px] pl-[0px]">
                    {visibleSitemap.map((item) => {
                        const isExpanded = expandedItems.includes(item.label);
                        const hasChildren = item.children && item.children.length > 0;
                        const isActive = activePage === item.page;

                        return (
                            <motion.div 
                                key={item.label}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    show: { opacity: 1, x: 0 }
                                }}
                                className="flex flex-col"
                            >
                                <div className="flex items-center justify-between group">
                                    <button
                                        onClick={() => {
                                            if (item.externalUrl) {
                                                window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
                                                onClose();
                                            } else {
                                                onNavigate(item.page);
                                                onClose();
                                            }
                                        }}
                                        className={`text-left text-xl md:text-2xl font-normal transition-colors duration-300 tracking-wide ${
                                            isActive ? 'text-gray-300' : 'text-white group-hover:text-gray-300'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                    
                                    {hasChildren && (
                                        <button 
                                            onClick={(e) => toggleExpand(item.label, e)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {hasChildren && isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden pl-4 md:pl-6  border-white/10 ml-2 mt-2 space-y-2"
                                        >
                                            {item.children!.map((child) => {
                                                // No additional translation needed - using t() function from menu structure
                                                let displayLabel = child.label;
                                                if (language === 'th') {
                                                    switch (child.label) {
                                                        case 'Bookings': displayLabel = 'การจอง'; break;
                                                        case 'Products': displayLabel = 'สินค้า'; break;
                                                        case 'Past Activities': displayLabel = 'กิจกรรมที่ผ่านมา'; break;
                                                    }
                                                }

                                                return (
                                                    <button
                                                        key={child.label}
                                                        onClick={() => {
                                                            onNavigate(child.page, undefined, undefined, child.section);
                                                            onClose();
                                                        }}
                                                        className="block w-full text-left text-xl md:text-2xl font-normal text-white hover:text-gray-300 transition-colors tracking-wide leading-relaxed py-1"
                                                    >
                                                        {displayLabel}
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}

                    {/* Footer Section */}
                </div>

                <motion.div 
                    className="h-[10vh] flex justify-between items-end w-full"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                    }}
                >
                    <div className="flex items-center gap-6">
                        <ExpandingSearch 
                            onNavigate={(page, slug) => {
                                onNavigate(page, slug);
                                onClose();
                            }}
                            className="gap-2"
                            iconClassName="w-6 h-6 text-white"
                            inputClassName="w-40 text-lg text-white placeholder:text-gray-500"
                        />
                        <a 
                            href="/bkkk"
                            className="text-xl md:text-2xl text-white font-normal hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer"
                        >
                            BKKK
                        </a>
                    </div>

                    {isMenuVisible('languageSwitcher') && (
                        <div className="text-xl md:text-2xl font-normal text-gray-500 select-none tracking-wide flex items-center">
                            <button 
                                className={`cursor-pointer transition-colors ${language === 'en' ? 'text-white' : 'hover:text-white'}`}
                                onClick={() => setLanguage('en')}
                            >
                                EN
                            </button>
                            <span className="mx-2">|</span>
                            <button 
                                className={`cursor-pointer transition-colors ${language === 'th' ? 'text-white' : 'hover:text-white'}`}
                                onClick={() => setLanguage('th')}
                            >
                                TH
                            </button>
                        </div>
                    )}
                </motion.div>

             </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}