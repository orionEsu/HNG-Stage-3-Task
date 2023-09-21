import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchInput = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const formRef = useRef('');
	const handleSubmit = (e) => {
		e.preventDefault();
		const value = formRef.current?.value;
		setSearchParams({ query: value.toLowerCase() });
	};

	return (
		<>
			<form
				action=''
				onChange={handleSubmit}
				className='form__input'
			>
				<input
					type='search'
					name=''
					id=''
					ref={formRef}
					placeholder='Search by tag'
					className='search__input'
				/>
			</form>
		</>
	);
};

export default SearchInput;
