import '@/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import SidePanelProvider from '@/contexts/SidePanelProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidePanelProvider>
      <App />
    </SidePanelProvider>
  </StrictMode>
);
