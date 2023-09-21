import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { database } from '../services/firebaseauth';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
	const errorMail = useRef('');
	const errorPassword = useRef('');
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e, type: string) => {
		e.preventDefault();
		setLoading(true);
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			if (type === 'signup') {
				const data = await createUserWithEmailAndPassword(
					database,
					email,
					password
				);
				setLoading(false);
				if (data?.user.uid) {
					navigate('/home');
				}
			} else {
				const data = await signInWithEmailAndPassword(
					database,
					email,
					password
				);
				setLoading(false);
				if (data?.user.uid) {
					navigate('/home');
				}
			}
		} catch (error) {
			setLoading(false);

			errorMail.current.style.opacity = 0;
			errorPassword.current.style.opacity = 0;
			if (error?.code.includes('mail')) {
				errorMail.current.textContent = error?.code;
				errorMail.current.style.opacity = 1;
			}

			if (error?.code.includes('password')) {
				errorPassword.current.textContent = error?.code;
				errorPassword.current.style.opacity = 1;
			}

			console.error(error);
		}
	};
	return (
		<div className='login'>
			<div className='login__form'>
				<form
					action=''
					onSubmit={(e) =>
						handleSubmit(e, login ? 'signin' : 'signup')
					}
				>
					<h3 className='login__heading'>
						{login ? 'Sign In' : 'Create an Account'}
					</h3>
					<div className='input'>
						<input
							type='email'
							name='email'
							id='email'
							className='login__form--mail'
							placeholder='Email'
							required
						/>
						<p
							className='error-mail'
							ref={errorMail}
						></p>
					</div>
					<div className='input'>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							className='login__form--password'
							required
						/>
						<p
							className='error-password'
							ref={errorPassword}
						></p>
					</div>

					<button className='sign-up'>
						{' '}
						{loading ? (
							<FontAwesomeIcon
								icon={faSpinner}
								spin
							/>
						) : login ? (
							'Sign In'
						) : (
							'Sign Up'
						)}
					</button>
				</form>
				<p className='login__check'>
					{login
						? "Don't have an account?"
						: 'Already have an account?'}{' '}
					<button
						className='login-btn'
						onClick={() => setLogin(!login)}
					>
						{login ? 'Sign Up' : 'Sign In'}
					</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
