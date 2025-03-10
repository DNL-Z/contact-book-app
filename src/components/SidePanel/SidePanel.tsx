import React, { ChangeEvent, useEffect, useState } from 'react';

import { TContact } from '@/types/contact';

export type ChangeInputEventType = ChangeEvent<HTMLInputElement>;

interface Props {
  isNew: boolean;
  contact?: TContact;
  contacts?: TContact[];
  handleClickUpdate?: (id: number, data: TContact) => void;
  handleClickCreate?: (data: TContact) => void;
  closePanel: () => void;
}

const SidePanel: React.FC<Props> = ({ isNew, contact, contacts, handleClickUpdate, handleClickCreate, closePanel }) => {

  const createNewId = () => {
    return contacts ? (Math.max(...contacts.map((contact) => contact.id)) + 1).toString() : '0';
  };

  // TODO: Fix ID type with useState<TContact>
  const [state, setState] = useState({
    id: contact?.id || createNewId(),
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    dateOfBirth: contact?.dateOfBirth || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
  });

  const handleChange = (e: ChangeInputEventType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (!state.firstName || !state.lastName || !state.dateOfBirth || !state.email || !state.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (isNew) {
      handleClickCreate?.(state);
    } else {
      handleClickUpdate?.(state.id, state);
    }
    closePanel();
  };

  useEffect(() => {
    if (contact) {
      setState(contact);
    }
  }, [contact]);

  return (
    <>
      <div className="fixed top-0 right-0 h-screen w-1/3 bg-gray-100 shadow-lg p-4 z-99">
        <div className="flex flex-col gap-4 items-center">
          <input type="text" name="firstName" value={state.firstName} onChange={handleChange} placeholder="First Name"
                 className="font-bold text-2xl text-gray-900 text-center overflow-hidden mb-4 border-2 rounded-2xl bg-purple-50 p-1" />
          <input type="text" name="lastName" value={state.lastName} onChange={handleChange} placeholder="Last Name"
                 className="font-bold text-2xl text-gray-900 text-center overflow-hidden mb-4 border-2 rounded-2xl bg-purple-50 p-1" />
          <input type="date" name="dateOfBirth" value={state.dateOfBirth} onChange={handleChange} placeholder="DOB"
                 className="font-bold text-2xl text-gray-900 text-center overflow-hidden mb-4 border-2 rounded-2xl bg-purple-50 p-1" />
          <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email"
                 className="font-bold text-2xl text-gray-900 text-center overflow-hidden mb-4 border-2 rounded-2xl bg-purple-50 p-1" />
          <input type="text" name="phone" value={state.phone} onChange={handleChange} placeholder="Phone"
                 className="font-bold text-2xl text-gray-900 text-center overflow-hidden mb-4 border-2 rounded-2xl bg-purple-50 p-1" />
          <button onClick={submit}>{isNew ? 'Create' : 'Update'}</button>
          <button onClick={closePanel}>Close</button>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
