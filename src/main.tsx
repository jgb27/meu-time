import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'

// Supports weights 100-900
import '@fontsource-variable/inter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
)
