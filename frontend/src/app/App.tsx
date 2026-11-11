import { RouterProvider } from 'react-router'
import { AppRoutes } from './app.routes'
import { AuthContextProvider } from '../context/AuthContext'
import './App.css'

const App = () => {
  return <AuthContextProvider><RouterProvider router={AppRoutes} /></AuthContextProvider> 
}

export default App