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
import CreateAffirmation from 'routes/affirmation/create';
import UpdateAffirmation from 'routes/affirmation/update';

const redirectUrl = '/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    loader: kakaoInitLoader,
    children: [
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
          <ProtectedRoute redirectUrl={redirectUrl}>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/affirmation/create',
        element: (
          <ProtectedRoute redirectUrl={redirectUrl}>
            <CreateAffirmation />
          </ProtectedRoute>
        ),
      },
      {
        path: '/affirmation/update/:id',
        element: (
          <ProtectedRoute redirectUrl={redirectUrl}>
            <UpdateAffirmation />
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
