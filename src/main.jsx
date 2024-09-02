import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Header from './components/custom/Header.jsx'
import CreateTrip from './create-trip/index.jsx'
import './index.css'
import Viewtrip from "./view-trip/[tripId]/index.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/create-trip",
    element: <CreateTrip/>
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    {/* // so this header will be present everywhere no matter what page is open  */}
    <Header/>
    <Toaster />
    <RouterProvider router ={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
