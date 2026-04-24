import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { LanguageProvider } from './lib/LanguageContext';
import { FavoritesProvider } from './lib/FavoritesContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </LanguageProvider>
  </StrictMode>,
);
