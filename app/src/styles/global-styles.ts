import { createGlobalStyle } from 'styled-components';
import darwinProRegular from './fonts/DarwinPro-Regular.otf';
import darwinProLight from './fonts/DarwinPro-Light.otf';
import darwinProSemiBold from './fonts/DarwinPro-SemiBold.otf';
import darwinProBold from './fonts/DarwinPro-Bold.otf';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`

  body {
    background-color: #f1f1f5;
    margin: 0;
    font-family: 'Inter';
    color: var(--greyscale-colors-grey-1, #1C1A46);
  }

  a {
    color: var(--greyscale-colors-grey-1, #1C1A46);
  }

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: normal;
  src: url(${darwinProRegular});
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  src: url(${darwinProLight});
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  src: url(${darwinProSemiBold});
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  src: url(${darwinProBold});
}
`;
