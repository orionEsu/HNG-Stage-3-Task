import { useEffect, useState } from 'react';
import { data } from '../data.ts';
import { useSearchParams } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import Sortable, { MultiDrag, Swap } from 'sortablejs';

Sortable.mount(new MultiDrag(), new Swap());
interface ItemType {
	id: number;
	gender: string;
	images: {
		gallery: string;
	};
}

const Grid = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q');

	const [state, setState] = useState<ItemType[]>(data);
	useEffect(() => {
		const images = query ? data.filter((el) => el.gender === query) : data;
		setState(images);
	}, [query]);

	return (
		<div className='grid-container'>
			<p className='tags'>
				Tags are: <strong>Men, Women, Children</strong>
			</p>
			{state.length === 0 && (
				<p className='error'>
					No item with tag: <strong>{query}</strong>
				</p>
			)}
			<ReactSortable
				list={state}
				setList={setState}
				className='grid'
			>
				{state.map((item) => (
					<img
						key={item.id}
						src={item.images.gallery}
						alt={item.gender}
					/>
				))}
			</ReactSortable>
		</div>
	);
};

export default Grid;
