import Home from 'app/pages/Home';
import { NotFoundPage } from 'app/pages/NotFoundPage/Loadable';
import ProfilePage from 'app/pages/ProfilePage';
import ProvidersPage from 'app/pages/ProvidersPage';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { isUserLoggedIn } from 'store/auth/selectors';
import { isProvider } from 'utils/roleMapper';

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {!isProvider() && (
        <>
          <Route path="/providers" element={<ProvidersPage />} />
          <Route
            path="/provider/:id"
            element={<ProfilePage itsOwnProfile={false} />}
          />
        </>
      )}
      <Route path="/profile" element={<ProfilePage itsOwnProfile={true} />} />
      <Route path="*" element={<NotFoundPage />} />;
    </Routes>
  );
};

export default ProtectedRoutes;
