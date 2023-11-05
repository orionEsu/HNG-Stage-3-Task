import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Homepage from './pages/Homepage.tsx';
import './index.css';
import Login from './pages/Login.tsx';
// import PrivateRoute from './routing/PrivateRoute.tsx';

const router = createBrowserRouter([
	{ path: '/', element: <Login /> },

	// {
	// 	element: <PrivateRoute />,
	// 	children: [{ path: '/home', element: <Homepage /> }],
	// },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
