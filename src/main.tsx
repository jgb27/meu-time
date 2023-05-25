import '@fontsource-variable/inter'; // Font Inter

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Chakra UI
import { ChakraProvider } from '@chakra-ui/react'

// Pages
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Error404 from './pages/ErrorPage';

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App';

// user localStorage
const user = localStorage.getItem("user")
const userJson = user ? JSON.parse(user) : null

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: userJson ? <Dashboard /> : <Login /> },
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
