import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';


// Create a root and render your app
const root = createRoot(document.getElementById('root'));
root.render(<App />);