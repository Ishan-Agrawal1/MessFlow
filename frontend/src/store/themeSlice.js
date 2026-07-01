import { createSlice } from '@reduxjs/toolkit';

// Read persisted theme from localStorage (backward-compatible with Zustand key)
function loadThemeState() {
  try {
    const raw = localStorage.getItem('theme-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      const data = parsed?.state ?? parsed;
      if (data?.theme) {
        return { theme: data.theme };
      }
    }
  } catch {
    // Corrupted data — start fresh
  }
  return { theme: 'light' };
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: loadThemeState(),
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
