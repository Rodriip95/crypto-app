import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#25DB25"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
`;

export default () => <SvgXml xml={xml} width="24" height="24" />;
