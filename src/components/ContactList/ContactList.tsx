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
      <div className="m-7 grid h-146 w-146 grid-cols-1 gap-3 overflow-hidden overflow-y-auto rounded-2xl bg-blue-200 p-7">
        <button
          className="mx-auto h-12 w-2/3 bg-gray-900 hover:bg-gray-950"
          onClick={() => openPanel(true, undefined)}
        >
          New Contact
        </button>
        {contacts.length > 0 ? (
          contacts.map((contact: TContact) => <ContactItem key={contact.id} contact={contact} />)
        ) : (
          <div className="mt-10 mb-5 text-center">
            <h2 className="mt-5 text-2xl text-gray-900">Contact Book is empty</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;
