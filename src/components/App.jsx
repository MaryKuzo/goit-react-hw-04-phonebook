import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useLocalStorage } from '../Hooks/Hooks';

function App() {

  const { contacts, setContacts } = useLocalStorage()
  const [filter, setFilter] = useState('')

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    if (contacts.some((contact) => contact.name.toLowerCase() === normalizedName)) {
      toast.error(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({id})=> id !== contactId))

  };

  const contactsName = contacts.map(contact => contact.name)
    return (
      <div>
        <ContactForm onSubmit={addContact} />
        <Filter value={filter} onChange={changeFilter} contactsName={contactsName } />
        <ContactList
          contacts={getVisibleContacts()}
          onClickDelete={deleteContact}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

    )
  };
export default App

