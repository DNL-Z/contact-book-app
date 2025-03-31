import React, { ChangeEvent, useEffect, useState } from 'react';

import UseSidePanel from '@/hooks/useSidePanel.tsx';
import useContactsStore from '@/stores/useContactsStore.ts';
import { TContact } from '@/types/contact';

export type ChangeInputEventType = ChangeEvent<HTMLInputElement>;

const SidePanel: React.FC = () => {
  const { isOpen, isNew, contact, closePanel } = UseSidePanel();
  const { contacts, addContact, updateContact } = useContactsStore();

  const [state, setState] = useState<TContact>({
    id: contact?.id || '',
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    dateOfBirth: contact?.dateOfBirth || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
  });

  const handleChange = (e: ChangeInputEventType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!state.firstName || !state.lastName || !state.dateOfBirth || !state.email || !state.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (isNew) {
      await addContact(state);
    } else {
      await updateContact(state.id, state);
    }
    closePanel();
  };

  const randomNewId = () => {
    return contacts && (Math.max(...contacts.map((contact) => parseInt(contact.id))) + 1).toString();
  };

  useEffect(() => {
    if (isNew) {
      setState({
        id: randomNewId(),
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
      });
    } else if (contact) {
      setState(contact);
    }
  }, [isNew, contact]);

  return (
    isOpen && (
      <div
        className="flex flex-col justify-center fixed top-0 m-auto right-0 h-screen w-1/3 bg-gray-100 shadow-lg p-4">
        <div className="flex flex-col gap-4 items-center">
          <input type="text" name="firstName" value={state.firstName} onChange={handleChange}
                 placeholder="First Name" />
          <input type="text" name="lastName" value={state.lastName} onChange={handleChange} placeholder="Last Name" />
          <input type="date" name="dateOfBirth" value={state.dateOfBirth} onChange={handleChange}
                 placeholder="Date Of Birthday" />
          <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" />
          <input type="text" name="phone" value={state.phone} onChange={handleChange} placeholder="Phone" />
          <button className="w-1/4 h-12 mx-auto bg-gray-900 hover:bg-gray-950 mt-7"
                  onClick={submit}>{isNew ? 'Create' : 'Update'}</button>
          <button className="w-1/4 h-12 mx-auto bg-gray-600 hover:bg-gray-700" onClick={closePanel}>Close</button>
        </div>
      </div>
    )
  );
};

export default SidePanel;
