import '@fontsource-variable/inter'; // Font Inter

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Chakra UI
import { ChakraProvider } from '@chakra-ui/react'

// Pages
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Error404 from './pages/Error404';

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
    ]
  }
])

// Render
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>,
)
