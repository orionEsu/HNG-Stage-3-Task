import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='h'>
			<div className='home home__header'>
				<div className='container'>
					<h1>
						A WEB-BASED INTRUTION DETECTION AND PREVENTION SYSTEM
						USING NEURAL NETWORK
					</h1>

					<div className='home__header--links'>
						<Link to={'/login'}>Register</Link>
						<Link to={'/login'}>Login</Link>
					</div>
				</div>
			</div>

			<div className='home home__body'>
				<div className='container'>
					<img
						src='/dist/assets/burglar_2595242b (1).jpg'
						alt=''
					/>
					<p>
						This application will monitor and detect intrusion into
						sites submitted to its list and log such threats when
						unknown threat is discovered, the system will mark it
						unknown untill the administrator define the identity and
						thereafter the system recognizes such threat.{' '}
					</p>
				</div>
			</div>

			<div className='home home__footer'>
				<div className='container'>
					<h2>
						A WEB-BASED INTRUTION DETECTION AND PREVENTION SYSTEM
						USING NEURAL NETWORK
					</h2>
					<p>Copyright 2023</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
