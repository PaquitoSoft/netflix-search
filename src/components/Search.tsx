import * as React from 'react';
import { SearchProps } from '../models/proptypes';
import { debounce } from '../utils/debounce';

// const apiKey = '87dfa1c669eea853da609d4968d294be';

const Search: React.FC<SearchProps> = (props) => {
	const [searchTerm, setSearchTerm] = React.useState('');

	const handleSearch = React.useCallback(debounce(value => {
		// props.onSearchChange(`search/multi?query=${value}&api_key=apiKey`);
		props.onSearchChange(`search/multi?query=${value}`);
	}, 500), []);

	const handleKeyUp = React.useCallback(event => {
		if (!searchTerm) {
			props.onSearchChange(null);
			return false;
		}

		handleSearch(searchTerm);
	}, [searchTerm, props.onSearchChange]);

	const handleChange = React.useCallback((event) => {
		setSearchTerm(event.target.value);
	}, []);

	return (
		<div id="search" className="Search">
			<input
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				onFocus={handleKeyUp}
				type="search"
				placeholder="Search for a title..."
				value={searchTerm}
			/>
		</div>
	);
};

export default Search;
