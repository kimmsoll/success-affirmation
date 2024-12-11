import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from 'routes/login';
import { kakaoInitLoader } from 'utils/kakaoInitLoader';
import KakaoAuth from 'routes/auth';
import Home from 'routes/home';
import ProtectedRoute from 'routes/protectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    loader: kakaoInitLoader,
    children: [
      // {index:true, path: '/', element: <Home/>}
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/auth',
        element: <KakaoAuth />,
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute redirectUrl='/'>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
