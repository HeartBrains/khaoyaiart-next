'use client';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import KyafBlk from '../../imports/KyafBlk';

interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick?: () => void;
  isTransparent?: boolean;
  isScrolled?: boolean;
}

export function Header({ onMenuClick, onLogoClick, isTransparent = false, isScrolled = false }: HeaderProps) {
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 px-[6vw] flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'} ${
        isTransparent ? 'bg-transparent text-white' : 'bg-transparent text-black'
      }`}
    >
      {/* Gradient Overlay for Desktop */}
      <div 
        className={`absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/50 to-transparent -z-10 pointer-events-none transition-opacity duration-300 ${
          isTransparent ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div 
        onClick={onLogoClick}
        className={`h-[40px] md:h-[60px] w-auto transition-opacity duration-300 ${onLogoClick ? 'cursor-pointer' : 'cursor-default'} ${
          isTransparent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ filter: isTransparent ? 'invert(1) brightness(2)' : 'none' }}
      >
        <KyafBlk className="h-full w-auto" />
      </div>
      <Button 
        variant="ghost" 
        onClick={onMenuClick}
        className={`w-[9vw] h-[9vw] min-w-[9vw] min-h-[9vw] md:w-[6vw] md:h-[6vw] md:min-w-[6vw] md:min-h-[6vw] !p-0 -mr-[2%] transition-colors ${
          isTransparent 
            ? 'text-white hover:bg-white/20 hover:text-white' 
            : 'text-black hover:bg-black/10 hover:text-black'
        }`}
      >
        <Menu className="!w-[82%] !h-[82%] md:!w-[45%] md:!h-[45%]" strokeWidth={1.5} />
      </Button>
    </header>
  );
}