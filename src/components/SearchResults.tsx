import * as React from 'react';
import { MovieTileProps, SearchResultsProps } from '../models/proptypes';
import { ApiData, ApiDataEntry } from '../models/types';

const apiKey = '87dfa1c669eea853da609d4968d294be';

const SearchResults: React.FC<SearchResultsProps> = (props) => {
	const [mounted, setMounted] = React.useState(false);
	const [data, setData] = React.useState<ApiData>({});

	const loadContent = () => {
		let requestUrl = `https://api.themoviedb.org/3/${props.searchUrl}&api_key=${apiKey}`;
		fetch(requestUrl)
			.then(res => res.json())
			.then(setData)
			.catch(console.error);
	};

	React.useEffect(() => {
		setMounted(true);
		loadContent();
	}, [props.searchUrl]);

	if (!props.searchUrl) return null;

	let tiles: JSX.Element[] = [];
	if (data.results) {
		const slice = data.results.slice(0, 5);
		tiles = slice.map(title => {
			const movieTileProps: MovieTileProps = createMovieTileProps(title);
			return <props.MovieTile key={title.id} {...movieTileProps} />
		});
	}

	return (
		<div className="SearchResults">
			<div className="TitleList" data-loaded={mounted}>
				<div className="Title">
					<div className="titles-wrapper">
						{data.results ? tiles : <p style={{ color: 'gray' }}> nothing was found</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResults;

const createMovieTileProps = (title: ApiDataEntry) => ({
	media_type: title.media_type,
	movieId: title.id,
	title: title.name || title.original_title,
	score: title.vote_average,
	overview: title.overview,
	backdrop: `http://image.tmdb.org/t/p/original/${title.backdrop_path}`,
});
