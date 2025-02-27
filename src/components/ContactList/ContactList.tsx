import * as React from 'react';

import Spinner from '@/components/Spinner/Spinner';
import { Contact } from '@/types/contact.ts';

interface Props {
  contacts: Contact[];
  isLoading: boolean;
}

const ContactList: React.FC<Props> = ({ contacts, isLoading }) => {

  if (isLoading) return <Spinner />;
  return (
    <div className="grid grid-cols-3 gap-1">
      {contacts.map((contact: Contact) => (
        <div key={contact.id} className="max-w-sm rounded-2xl overflow-hidden bg-blue-200 m-7 p-7">
          <div className="font-bold text-2xl text-gray-900 mb-4">{contact.firstName} {contact.lastName}</div>
          <div className="text-gray-700">
            <div>{contact.dateOfBirth}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
