import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create(devtools(((set) => ({
  users: [],
  setUsers: (updatedUsers) => set({ users: updatedUsers }),

  messages: [],
  setMessages: (updatedMessages) => set({ messages: updatedMessages }),

  isLoggedIn: false,
  toggleLogin: (prevState) => set({isLoggedIn: !prevState}),

  currentUser: { 
    _id: '',
    username: '',
    password: '',
    profile: {
      age: '',
      birthday: '',
      location: '',
      about: '',
    },
    friends: []
  },
  setCurrentUser: (user) => set({ currentUser: user }),

  errorMessage: '',
  setErrorMessage: (newMessage) => set({ errorMessage: newMessage }),
}))));