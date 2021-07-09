import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
    }
    html, body{
        font-family: 'Noto Sans', sans-serif;
        font-family: 'Noto Sans KR', sans-serif;
    }
    a {
        text-decoration: none;
        color:inherit;
    }
`;

export default globalStyle;
