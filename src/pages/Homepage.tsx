import Nav from '../layout/Nav';
import Grid from '../components/Grid';
import { signOut } from 'firebase/auth';
import { database } from '../services/firebaseauth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';

const Homepage = () => {
	const navigate = useNavigate();
	

	const handleSignout = async (e) => {
		e.preventDefault();
		try {
			const data = await signOut(database);
			navigate('/');
		} catch (error) {
			console.log(error?.code);
		}
	};
	return (
		<>
			<button
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
