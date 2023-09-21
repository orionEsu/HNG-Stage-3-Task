import { FormEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchInput = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const formRef = useRef<HTMLInputElement>(null);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = formRef.current?.value;
		if (value) setSearchParams({ query: value.toLowerCase() });
	};

	return (
		<>
			<form
				action=''
				onSubmit={handleSubmit}
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
