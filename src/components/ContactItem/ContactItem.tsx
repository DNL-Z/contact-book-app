import React from 'react';

import UseSidePanel from '@/hooks/useSidePanel.tsx';
import useContactsStore from '@/stores/useContactsStore.ts';
import { TContact } from '@/types/contact.ts';

interface Props {
  contact: TContact;
}

const ContactItem: React.FC<Props> = ({ contact }) => {
  const { openPanel } = UseSidePanel();
  const { deleteContact } = useContactsStore();

  return (
    <>
      <div key={contact.id} className="grid grid-cols-3 rounded-2xl max-h-36 bg-purple-50 p-3">
        <div className="flex flex-col justify-center col-span-2 truncate overflow-auto">
          <div className="font-bold text-2xl text-gray-900 mb-4">{contact.firstName} {contact.lastName}</div>
          <div className="text-gray-700">
            <div>{contact.dateOfBirth}</div>
            <div>{contact.phone}</div>
            <div>{contact.email}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <button className="bg-green-900 hover:bg-green-950" onClick={() => openPanel(false, contact)}>Edit Contact
          </button>
          <button className="bg-red-900 hover:bg-red-950" onClick={() => deleteContact(contact.id)}>Delete
            Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactItem;
