import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from './pages/login/index.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './pages/error/index.jsx';
import { Register } from './pages/register/index.jsx';
import { Home } from './pages/home/index.jsx';
import './styles/global.scss'

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('userSignIn'));
  const googleUser = JSON.parse(localStorage.getItem('googleUserSignIn'));
  if (user || googleUser){
    return true; 
  }else{
    console.log("Não há usuario Logado")
    return false;
  }
};

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
    errorElement: <ErrorPage/>
  },
  {
    path:"/register",
    element: <Register/>,
    errorElement: <ErrorPage/>
  },
  {
    path:"/home",
    element: isAuthenticated() ? <Home /> : <Login />,
    errorElement: <ErrorPage/>
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
