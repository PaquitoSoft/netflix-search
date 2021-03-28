import * as React from 'react';
import useDismiss from '../hooks/useDismiss';
import { SearchExtensionProps } from '../models/proptypes';
import Search from './Search';
import SearchResults from './SearchResults';

const SearchExtension: React.FC<SearchExtensionProps> = ({ MovieTile }) => {
	const [searchUrl, setSearchUrl] = React.useState('');
	const [resultsVisible, setResultsVisible] = React.useState(false);
	const wrapperRef = React.useRef(null);

	useDismiss(() => setResultsVisible(false), wrapperRef);

	const performSearch = (url: string) => {
		setSearchUrl(url);
		setResultsVisible(!!url);
	};

	return (
		<div className="SearchContainer" ref={wrapperRef}>
			<Search onSearchChange={performSearch} />
			{resultsVisible &&
				<SearchResults
					searchUrl={searchUrl}
					MovieTile={MovieTile}
				/>
			}
		</div>
	);
};

export default SearchExtension;
