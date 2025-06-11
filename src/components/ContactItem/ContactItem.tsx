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
      <div key={contact.id} className="grid max-h-36 grid-cols-3 rounded-2xl bg-purple-50 p-3">
        <div className="col-span-2 flex flex-col justify-center truncate overflow-auto">
          <div className="mb-4 text-2xl font-bold text-gray-900">
            {contact.firstName} {contact.lastName}
          </div>
          <div className="text-gray-700">
            <div>{contact.dateOfBirth}</div>
            <div>{contact.phone}</div>
            <div>{contact.email}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <button
            className="bg-green-900 hover:bg-green-950"
            onClick={() => openPanel(false, contact)}
          >
            Edit Contact
          </button>
          <button className="bg-red-900 hover:bg-red-950" onClick={() => deleteContact(contact.id)}>
            Delete Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactItem;
