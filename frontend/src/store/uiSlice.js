import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: true,
  },
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
