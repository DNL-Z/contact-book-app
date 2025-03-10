import React from 'react';

import { TContact } from '@/types/contact.ts';

interface Props {
  contact: TContact;
  onPanel: (isNew: boolean, contact?: TContact) => void;
  onDelete: (id: number) => void;
}

const ContactItem: React.FC<Props> = ({ contact, onPanel, onDelete }) => {
  return (
    <>
      <div key={contact.id} className="grid grid-cols-2 rounded-2xl max-h-36 bg-purple-50 p-3">
        <div className="flex flex-col justify-center">
          <div className="font-bold text-2xl text-gray-900 mb-4">{contact.firstName} {contact.lastName}</div>
          <div className="text-gray-700">
            <div>{contact.dateOfBirth}</div>
            <div>{contact.phone}</div>
            <div>{contact.email}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <button onClick={() => onPanel(false, contact)}>Edit Contact</button>
          <button onClick={() => onDelete(contact.id)}>Delete Contact</button>
        </div>
      </div>
    </>
  );
};

export default ContactItem;
