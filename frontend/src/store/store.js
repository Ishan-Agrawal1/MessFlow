import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});

// Persist auth & theme slices to localStorage on every state change
store.subscribe(() => {
  const state = store.getState();

  // Persist auth (same key as Zustand for backward compat)
  try {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({
        state: { user: state.auth.user, isAuthenticated: state.auth.isAuthenticated },
        version: 0,
      })
    );
  } catch {
    // Storage full or unavailable — ignore
  }

  // Persist theme
  try {
    localStorage.setItem(
      'theme-storage',
      JSON.stringify({
        state: { theme: state.theme.theme },
        version: 0,
      })
    );
  } catch {
    // Storage full or unavailable — ignore
  }
});

export default store;
