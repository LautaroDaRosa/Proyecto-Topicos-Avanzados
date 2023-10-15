import Home from 'app/pages/Home';
import { NotFoundPage } from 'app/pages/NotFoundPage/Loadable';
import ProvidersPage from 'app/pages/ProvidersPage';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { isUserLoggedIn } from 'store/auth/selectors';

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/providers/:id" element={<></>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ProtectedRoutes;
