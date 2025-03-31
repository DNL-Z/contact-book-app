import { createContext } from 'react';

import { TContact } from '@/types/contact.ts';

interface SidePanelState {
  isOpen: boolean;
  isNew: boolean;
  contact?: TContact;
  openPanel: (isNew: boolean, contact?: TContact) => void;
  closePanel: () => void;
}

const SidePanelContext = createContext<SidePanelState | undefined>(undefined);

export default SidePanelContext;
