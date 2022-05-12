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

  bookDetails: null,
  setBookDetails: (details) => set(() => ({ bookDetails: details})),

  bookclubName: null,
  setBookclubName: (name) => set(() => ({ bookclubName: name})),

  bookclubDetails: null,
  setBookclubDetails: (details) => set(() => ({ bookclubDetails : details})),

  searchHistory: [],
  setSearchHistory: (search) => set((history) => ({ searchHistory: [...history, search] })),
}));

export default useStore;
