import { useState, useEffect } from "react";

export const initContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
export const useLocalStorage = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? initContacts
  });

    useEffect(() => {
    if (contacts.length === 0) {
      setContacts(initContacts);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts, setContacts]);
   return { contacts, setContacts };
}

