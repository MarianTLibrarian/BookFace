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
<<<<<<< HEAD
  setBookDetails: (details) => set(() => ({ bookDetails: details})),

  bookclubName: null,
  setBookclubName: (name) => set(() => ({ bookclubName: name})),

  bookclubDetails: null,
  setBookclubDetails: (details) => set(() => ({ bookclubDetails : details}))
=======
  setBookDetails: (details) => set(() => ({ bookDetails: details })),

  clubName: null,
  setBookclubName: (name) => set(() => ({ clubName: name})),

  usersBookclubs: null,
  setUsersBookclubs: (details) => set(() => ({ clubs: details})),

  bookclubDetails: null,
  setBookclubDetails: (details) => set(() => ({ bookclubDetails: details })),

  searchHistory: [],
  setSearchHistory: (search) => set((history) => ({ searchHistory: [...history, search] })),

  searchFilter: 'all',
  setSearchFilter: (filter) => set(() => ({ searchFilter: filter })),
>>>>>>> main
}));

export default useStore;
