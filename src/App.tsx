import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Main } from './container/main';
import { seedData } from './data/seed-data';
import { Service } from './data/service';
import { ServiceContext } from './hooks/service-context';


const theme = {
  colors: {
    body: "green",
    text: "#000000",
    highlight: "orange",
    secondary: "blue",
    input: {
      text: "#FFFFFF",
      background: "#000000"
    },
    link: {
      text: "teal",
      opacity: 1
    }
  },
  font: "Tinos",
}


const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${theme.colors.body};
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`


const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`


function App() {
  return (

    <StyledWrapper id="root">
      <Main />
    </StyledWrapper>
  );
}

const WrappedApp = () => (
  <ServiceContext.Provider value={new Service(seedData)}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </ServiceContext.Provider>
);

export default WrappedApp;
