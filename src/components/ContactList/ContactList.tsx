import React from 'react';

import ContactItem from '@/components/ContactItem/ContactItem.tsx';
import { TContact } from '@/types/contact.ts';

interface Props {
  contacts: TContact[];
  onPanel: (isNew: boolean, contact?: TContact) => void;
  onDelete: (id: string) => void;
}

const ContactList: React.FC<Props> = ({ contacts, onPanel, onDelete }) => {
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <>
      <div
        className="grid grid-cols-1 gap-3 rounded-2xl bg-blue-200 m-7 p-7 overflow-hidden overflow-y-auto h-146 w-146">
        <button className="w-2/3 h-12 mx-auto" onClick={() => onPanel(true, undefined)}>New Contact</button>
        {contacts.length > 0 ? contacts.map((contact: TContact) => (
          <ContactItem key={contact.id} contact={contact} onPanel={() => onPanel(false, contact)}
                       onDelete={onDelete} />
        )) : (
          <div className="text-center mt-10 mb-5">
            <i className="fa-regular fa-clipboard fa-3x"></i>
            <h2 className="text-gray-900 text-2xl mt-5">Contact Book is empty</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;
