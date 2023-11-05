import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FirebaseError } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { database } from '../services/firebaseauth';

const Login = () => {
	const errorMail = useRef<HTMLParagraphElement>(null);
	const errorPassword = useRef<HTMLParagraphElement>(null);
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState(true);
	const [mailError, setMailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		type: string
	) => {
		e.preventDefault();
		setLoading(true);

		const targetElement = e.target as HTMLFormElement;
		const email = targetElement?.email.value;
		const password = targetElement?.password.value;

		try {
			if (type === 'signup') {
				const data = await createUserWithEmailAndPassword(
					database,
					email,
					password
				);
				if (data?.user?.uid) {
					setLoading(false);
					navigate('/home');
					targetElement.reset();
				}
			} else {
				const data = await signInWithEmailAndPassword(
					database,
					email,
					password
				);
				setLoading(false);
				if (data?.user.uid) {
					// navigate('/home');
					targetElement.reset();
				}
			}
		} catch (error) {
			setLoading(false);
			const firebaseError = error as FirebaseError;

			if (errorPassword?.current && errorMail?.current) {
				errorMail.current.style.opacity = '0';
				errorPassword.current.style.opacity = '0';
			}

			if (firebaseError?.code.includes('email') && errorMail?.current) {
				setMailError(firebaseError?.code.slice(5));
				errorMail.current.style.opacity = '1';
			} else if (
				firebaseError?.code.includes('password') &&
				errorPassword?.current
			) {
				setPasswordError(firebaseError?.code.slice(5));
				errorPassword.current.style.opacity = '1';
			} else {
				alert(firebaseError?.code.slice(5));
			}
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
						>
							{mailError}
						</p>
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
						>
							{passwordError}
						</p>
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
						onClick={() => {
							setLogin(!login);
							setMailError('');
							setPasswordError('');
						}}
					>
						{login ? 'Sign Up' : 'Sign In'}
					</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
