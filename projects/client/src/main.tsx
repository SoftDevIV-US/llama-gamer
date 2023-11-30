import 'react-multi-carousel/lib/styles.css';
import './assets/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position='bottom-right' visibleToasts={3} theme='dark' closeButton expand />
    </BrowserRouter>
  </StrictMode>
);
