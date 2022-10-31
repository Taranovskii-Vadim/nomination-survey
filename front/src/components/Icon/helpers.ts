import { Size } from './types';

export const getBoxSize = (size: Size): number => {
  if (size === 'small') return 1;
  if (size === 'large') return 12;

  return 5;
};
