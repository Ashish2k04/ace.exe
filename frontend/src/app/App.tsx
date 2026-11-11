import { RouterProvider } from 'react-router'
import { AppRoutes } from './app.routes'
import { AuthProvider } from '../context/AuthContext'
import './App.css'

const App = () => {
  return <AuthProvider><RouterProvider router={AppRoutes} /></AuthProvider> 
}

export default App