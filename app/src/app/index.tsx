/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import Login from './pages/Login';
import ProtectedRoutes from './routes/ProtectedRoutes';

import { useTranslation } from 'react-i18next';
import InvitationPage from './pages/InvitationPage';
import RegisterPage from './pages/RegisterPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - DERES App"
        defaultTitle="DERES App"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="DERES Application" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/invitation/:token" element={<InvitationPage />} />
        <Route path="/sign_up/:token" element={<RegisterPage />} />
        <Route path="*" element={<ProtectedRoutes />} />
      </Routes>
      <GlobalStyle />
      <ToastContainer />
    </BrowserRouter>
  );
}
