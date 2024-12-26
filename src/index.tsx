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
import ReadAffirmation from 'routes/affirmation/read';
import RedirectIfAuthenticated from 'routes/replaceIfAuthenticatedRoute';
import ROUTES from 'routes';

const redirectUrl = ROUTES.ROOT;

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    // errorElement: <NotFound />,
    loader: kakaoInitLoader,
    children: [
      {
        path: ROUTES.ROOT,
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: ROUTES.KAKAO_AUTH,
        element: (
          <RedirectIfAuthenticated>
            <KakaoAuth />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: ROUTES.HOME,
        element: (
          <ProtectedRoute redirectUrl={redirectUrl}>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CREATE,
        element: (
          <ProtectedRoute redirectUrl={redirectUrl}>
            <CreateAffirmation />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.UPDATE,
        element: (
          <ProtectedRoute redirectUrl={redirectUrl}>
            <UpdateAffirmation />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.READ,
        element: (
          <ProtectedRoute redirectUrl={redirectUrl}>
            <ReadAffirmation />
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
