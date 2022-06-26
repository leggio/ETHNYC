import { createGlobalStyle } from 'styled-components';

import fonts from '../../assets/fonts';

const GlobalStyles = createGlobalStyle`
	${fonts}

	html {
		box-sizing: border-box;
		height: 100%;
	}

	body {
		margin: 0;
		height: 100%;
		font-family: "nowayregular";
	}

	#root {
		height: 100%;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
`;

export default GlobalStyles;
