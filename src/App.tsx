import '@/styles/App.css';

import React, { useEffect, useState } from 'react';

import ContactList from '@/components/ContactList/ContactList';
import SidePanel from '@/components/SidePanel/SidePanel.tsx';
import Spinner from '@/components/Spinner/Spinner.tsx';
import { contactService } from '@/services/apiService.ts';
import { TContact } from '@/types/contact.ts';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<TContact[]>([]);
  const [panelState, setPanelState] = useState<{ isOpen: boolean; isNew: boolean; contact?: TContact }>({
    isOpen: false,
    isNew: false,
    contact: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  const openSidePanel = (isNew: boolean, contact?: TContact) => {
    setPanelState({ isOpen: true, isNew, contact });
  };

  const closeSidePanel = () => {
    setPanelState({ isOpen: false, isNew: false, contact: undefined });
  };

  const fetchContacts = async () => {
    try {
      const data = await contactService.fetchContacts();
      setContacts(data);
      console.log('Data fetched successfully :', data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleCreateContact = async (data: TContact) => {
    try {
      const newContact = await contactService.createContact(data);
      setContacts([...contacts, newContact]);
      console.log('Contact created successfully!', newContact);
    } catch (error) {
      console.error('Error while creating contact:', error);
    }
  };

  const handleUpdateContact = async (id: string, data: TContact) => {
    if (id === null) return; // Security check avoid calling API with null id
    try {
      const updatedContact = await contactService.updateContact(id, data);
      setContacts(contacts.map((contact) => (contact?.id === id ? updatedContact : contact)));
      console.log('Contact updated successfully!', updatedContact);
    } catch (error) {
      console.error('Error while updating contact:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      console.log('Contact deleted successfully!', id);
    } catch (error) {
      console.error('Error while deleting contact :', error);
    }
  };

  useEffect(() => {
    fetchContacts().then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div>
      <div className={`${panelState.isOpen ? 'blur-sm pointer-events-none z-10' : ''}`}>
        <h1 className="text-3xl font-bold">
          Contact Book App
        </h1>
        <ContactList contacts={contacts} onPanel={openSidePanel} onDelete={handleDeleteContact} />
      </div>
      {panelState.isOpen && (
        <SidePanel isNew={panelState.isNew} contact={panelState.contact} contacts={contacts}
                   handleClickCreate={handleCreateContact}
                   handleClickUpdate={handleUpdateContact} closePanel={closeSidePanel} />
      )}
    </div>
  );
};

export default App;
