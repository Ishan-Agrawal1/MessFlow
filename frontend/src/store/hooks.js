import { useDispatch, useSelector } from 'react-redux';

/** @type {() => import('@reduxjs/toolkit').Dispatch} */
export const useAppDispatch = useDispatch;

/** @type {import('react-redux').TypedUseSelectorHook<import('./store').default>} */
export const useAppSelector = useSelector;
