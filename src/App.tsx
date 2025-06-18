import '@/styles/App.css';

import React from 'react';
import { Toaster } from 'react-hot-toast';

import ContactList from '@/components/ContactList/ContactList';
import SidePanel from '@/components/SidePanel/SidePanel.tsx';
import UseSidePanel from '@/hooks/useSidePanel.tsx';

const App: React.FC = () => {
  const { isOpen, closePanel } = UseSidePanel();

  return (
    <>
      {isOpen && <div className="fixed inset-0" onClick={closePanel}></div>}
      <div className={`${isOpen ? 'pointer-events-none z-10 blur-sm' : ''}`}>
        <h1 className="text-3xl font-bold">Contact Book App</h1>
        <ContactList />
      </div>
      <SidePanel />
      <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
    </>
  );
};

export default App;
