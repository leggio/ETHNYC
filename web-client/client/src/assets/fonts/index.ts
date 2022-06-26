import {css} from 'styled-components';

import argesta_hairlineregular from './argestahairline-regular-webfont.woff2';
import argesta_textregular from './argestatext-regular-webfont.woff2';
import nowaymedium from './noway-medium-webfont.woff2';
import nowayregular from './noway-regular-webfont.woff2';
import nowaythin from './noway-thin-webfont.woff2';

const fonts = css`
  @font-face {
    font-family: "nowayregular";
    src: url(${nowayregular}) format('woff2');
  }

  @font-face {
    font-family: "nowaymedium";
    src: url(${nowaymedium}) format('woff2');
  }

  @font-face {
    font-family: "nowaythin";
    src: url(${nowaythin}) format('woff2');
  }

  @font-face {
    font-family: "argesta_textregular";
    src: url(${argesta_textregular}) format('woff2');
  }

  @font-face {
    font-family: "argesta_hairlineregular";
    src: url(${argesta_hairlineregular}) format('woff2');
  }
`;

export default fonts;
