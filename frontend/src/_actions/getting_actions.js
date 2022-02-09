import { GETTING_ITEMS } from './types';

export const gettingItems = ({ items }) => {
  return {
    type: GETTING_ITEMS,
    payload: items,
  };
};
