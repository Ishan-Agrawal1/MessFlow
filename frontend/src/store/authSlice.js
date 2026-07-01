import { createSlice } from '@reduxjs/toolkit';

// Read persisted auth from localStorage (backward-compatible with Zustand key)
function loadAuthState() {
  try {
    const raw = localStorage.getItem('auth-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      // Zustand persist wraps state in { state: { ... }, version: 0 }
      const data = parsed?.state ?? parsed;
      if (data?.user) {
        return { user: data.user, isAuthenticated: true };
      }
    }
  } catch {
    // Corrupted data — start fresh
  }
  return { user: null, isAuthenticated: false };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    setAuth(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
