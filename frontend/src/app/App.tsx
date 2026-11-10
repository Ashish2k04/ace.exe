import { RouterProvider } from 'react-router'
import { AppRoutes } from './app.routes'
import './App.css'

const App = () => {
  return <RouterProvider router={AppRoutes} />
}

export default App