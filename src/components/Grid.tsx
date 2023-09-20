import { useEffect } from 'react';
import { data } from '../data.ts';
import { useSearchParams } from 'react-router-dom';

const Grid = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('query');
	const images = query ? data?.filter((el) => el.gender === query) : data;

	console.log(images);

	return (
		<>
			<div className='grid-container'>
				<p className='tags'>
					Tags are: <strong>Men</strong>, <strong>Women</strong>,{' '}
					<strong>Children</strong>
				</p>{' '}
				{images.length === 0 && (
					<p className='error'>No Item With This Tag</p>
				)}
				<div className='grid'>
					{images?.map((el) => (
						<img
							key={el.id}
							src={el.images.gallery}
							alt={el.gender}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Grid;
