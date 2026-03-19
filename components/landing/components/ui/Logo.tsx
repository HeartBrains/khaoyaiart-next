'use client';
import svgPaths from '../../imports/svg-jcoid2vnfk';
import bkkSvgPaths from '../../imports/svg-4a7jvyp0q8';

interface LogoProps {
  className?: string;
  white?: boolean;
}

export function Logo({ className = '', white = false }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 355 133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <g id="bangkok-kunsthalle-logo">
        <path
          d={white ? bkkSvgPaths.p3053d140 : svgPaths.pa87c400}
          fill={white ? 'white' : 'currentColor'}
        />
      </g>
    </svg>
  );
}