import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import './scss/main.scss';

import Game from './Game';
import RedirectNotice from './RedirectNotice';


WebFont.load({
  google: {
    families: ['Share Tech Mono', 'Sarpanch:900' ],
  }
});

class CoNu extends React.PureComponent {
	render() {
		return (
			<main className="main">

				<header>
					<h1 className="title">CoNu</h1>
				</header>

				<RedirectNotice />

			</main>
		);
	}
}

ReactDOM.render(
	<CoNu />,
	document.getElementById('react-root')
);

module.hot.accept();
