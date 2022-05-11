import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),

  token: null,
  setToken: (token) => set(() => ({ token })),

  updateState: (state) => set(() => ({ ...state })),

  expressUrl: 'http://localhost:3030',

  searchQuery: '',
  setSearchQuery: (query) => set(() => ({ searchQuery: query })),
}));

export default useStore;
