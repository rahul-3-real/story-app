import { Navigate, Outlet } from 'react-router-dom';

const UnAuthenticated = ({ pathname, hideMainPaths, isAuthenticated }) => {
    if (!hideMainPaths.includes(pathname) && !isAuthenticated) {
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }
};

export default UnAuthenticated;