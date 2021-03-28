import * as React from 'react';
import { PiletApi } from '@paquitosoft/netflix-piral';
import SearchExtension from './components/SearchExtension';
import { MovieTileProps } from './models/proptypes';
import './style.scss';

export function setup(app: PiletApi) {
//   app.showNotification('Hello from Piral!', {
//     autoClose: 2000,
//   });
//   app.registerMenu(() =>
//     <a href="https://docs.piral.io" target="_blank">Documentation</a>
//   );
//   app.registerTile(() => <div>Welcome to Piral!</div>, {
//     initialColumns: 2,
//     initialRows: 1,
//   });

	const MovieTile: React.FC<MovieTileProps> = props => <app.Extension name="MovieTile" params={props} />;
	app.registerExtension('search', () => <SearchExtension MovieTile={MovieTile} />);
}
