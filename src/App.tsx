import '@/styles/App.css';

import { useState } from 'react';

import ContactList from '@/components/ContactList/ContactList';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const contacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phone: '1234567890',
      email: 'john.doe@test.com',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1995-01-01',
      phone: '0987654321',
      email: 'jane.doe@test.com',
    },
    {
      id: 3,
      firstName: 'James',
      lastName: 'Smith',
      dateOfBirth: '1992-01-01',
      phone: '1234567890',
      email: 'james.smith@test.com',
    },
  ];

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <>
      <h1 className="text-3xl font-bold">Contact Book App</h1>
      <ContactList contacts={contacts} isLoading={isLoading} />
    </>
  );
}

export default App;
