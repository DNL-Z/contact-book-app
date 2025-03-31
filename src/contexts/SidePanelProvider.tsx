import React, { useState } from 'react';

import SidePanelContext from '@/contexts/SidePanelContext.tsx';
import { TContact } from '@/types/contact.ts';

const SidePanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{ isOpen: boolean; isNew: boolean; contact?: TContact }>({
    isOpen: false,
    isNew: false,
    contact: undefined,
  });

  const openPanel = (isNew: boolean, contact?: TContact) => {
    setState({ isOpen: true, isNew, contact });
  };

  const closePanel = () => {
    setState({ isOpen: false, isNew: false, contact: undefined });
  };

  return (
    <SidePanelContext.Provider value={{ ...state, openPanel, closePanel }}>
      {children}
    </SidePanelContext.Provider>
  );
};

export default SidePanelProvider;
