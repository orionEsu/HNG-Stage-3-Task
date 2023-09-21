import Nav from '../layout/Nav';
import Grid from '../components/Grid';
import { signOut } from 'firebase/auth';
import { database } from '../services/firebaseauth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';

const Homepage = () => {
	const navigate = useNavigate();
	

	const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await signOut(database);
			navigate('/');
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			<button
				title='Signout Button'
				className='btn-signout'
				onClick={handleSignout}
			>
				<FontAwesomeIcon
					icon={faRightFromBracket}
					size='2xl'
				/>
			</button>
			<Nav />
			<Grid />
		</>
	);
};

export default Homepage;
