import React, { useEffect } from 'react';

import ContactItem from '@/components/ContactItem/ContactItem.tsx';
import Spinner from '@/components/Spinner/Spinner.tsx';
import UseSidePanel from '@/hooks/useSidePanel.tsx';
import useContactsStore from '@/stores/useContactsStore.ts';
import { TContact } from '@/types/contact.ts';

const ContactList: React.FC = () => {
  const { openPanel } = UseSidePanel();
  const { contacts, isLoading, getContacts } = useContactsStore();

  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));

  useEffect(() => {
    getContacts();
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div
        className="grid grid-cols-1 gap-3 rounded-2xl bg-blue-200 m-7 p-7 overflow-hidden overflow-y-auto h-146 w-146">
        <button
          className="w-2/3 h-12 mx-auto bg-gray-900 hover:bg-gray-950"
          onClick={() => openPanel(true, undefined)}>New Contact
        </button>
        {contacts.length > 0 ? contacts.map((contact: TContact) => (
          <ContactItem key={contact.id} contact={contact} />
        )) : (
          <div className="text-center mt-10 mb-5">
            <h2 className="text-gray-900 text-2xl mt-5">Contact Book is empty</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;
