import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/tokens.css';
import './app/styles/index.css';
import './app/styles/glass.css';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
