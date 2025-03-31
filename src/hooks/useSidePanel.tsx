import { useContext } from 'react';

import SidePanelContext from '@/contexts/SidePanelContext.tsx';

const UseSidePanel = () => {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error('useSidePanel must be used within a SidePanelProvider');
  }
  return context;
};

export default UseSidePanel;
