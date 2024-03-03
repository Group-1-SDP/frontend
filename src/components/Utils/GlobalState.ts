import { atom } from 'jotai';

//Username Global storage
const storedUsername = localStorage.getItem('username') || '';
export const usernameAtom = atom(storedUsername);