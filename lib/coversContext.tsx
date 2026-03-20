'use client';
import { createContext, useContext } from 'react';
import type { CoverConfigMap } from './wp-api';

export const CoversContext = createContext<CoverConfigMap>({});

export function useCovers(): CoverConfigMap {
  return useContext(CoversContext);
}
