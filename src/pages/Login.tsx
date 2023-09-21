import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { database } from '../services/firebaseauth';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
	const errorMail = useRef<HTMLParagraphElement>(null);
	const errorPassword = useRef<HTMLParagraphElement>(null);
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		type: string
	) => {
		e.preventDefault();
		setLoading(true);
		const targetElement = e.target as HTMLFormElement;

		try {
			if (type === 'signup') {
				const data = await createUserWithEmailAndPassword(
					database,
					targetElement?.email.value,
					targetElement?.password.value
				);
				setLoading(false);
				if (data?.user.uid) {
                    targetElement.email.value = '';
					targetElement.password.value = '';
					navigate('/home');
				}
			} else {
				const data = await signInWithEmailAndPassword(
					database,
					targetElement?.email.value,
					targetElement?.password.value
				);
				setLoading(false);
				if (data?.user.uid) {
					navigate('/home');
					targetElement.email.value = '';
					targetElement.password.value = '';
				}
			}
		} catch (error) {
			setLoading(false);
			const firebaseError = error as FirebaseError;

			if (
				errorMail?.current &&
				errorPassword?.current &&
				errorMail?.current
			) {
				errorMail.current.style.opacity = '0';
				errorPassword.current.style.opacity = '0';
			}

			if (
				firebaseError?.code.includes('mail') &&
				errorMail &&
				errorMail?.current
			) {
				setError(firebaseError?.code);
				errorMail.current.style.opacity = '1';
			}

			if (
				firebaseError?.code.includes('password') &&
				errorPassword &&
				errorPassword?.current
			) {
				setError(firebaseError?.code);
				errorPassword.current.style.opacity = '1';
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
							{error}
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
							{error}
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
							setError('');
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
