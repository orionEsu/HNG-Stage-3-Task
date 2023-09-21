import { getAuth } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	if (!currentUser) return <Navigate to={'/'} />;
	return <Outlet />;
};

export default PrivateRoute;
