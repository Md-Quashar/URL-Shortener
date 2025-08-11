import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import Head from './auth/Head/Head.jsx';
import Sign_up from './auth/Sign_up/Sign_up.jsx';
import Login from './auth/Login/Login.jsx';
import PassReset from './auth/PassReset/PassReset.jsx';
import Home from './components/Home/Home.jsx';
import { UrlProvider } from './UrlContext/UrlContext.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutAuth/>, 
      children: [
        {
        index: true,  
        element: <Login />
       },
        {
          path: "signup", 
          element: <Sign_up />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "pass-reset",
          element: <PassReset />  
        },
      ]
    },
    {
      path: "/home",
      element: <Home/>,
     
    }
  ]);


 
  function LayoutAuth() {
    return (
      <>
        <Head/>
        <Outlet /> 
      </>
    );
  }

  return (
    
    <UrlProvider>
    <RouterProvider router={router} />
    </UrlProvider>

  );
}

export default App; 