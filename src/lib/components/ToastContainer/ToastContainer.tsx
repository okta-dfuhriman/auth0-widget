import React from 'react';
import { ToastContainer as ToastifyContainer } from 'react-toastify';

const ToastContainer = () => {
	return (
		<ToastifyContainer
			position='top-center'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
};

export default ToastContainer;
