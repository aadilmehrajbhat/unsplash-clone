import GlobalStyle from './GlobalStyle';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';

const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

export default ThemeProvider;
