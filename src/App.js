import './App.css';
import { UnsplashSearchProvider } from '@contexts/search-context';
import Routes from './Routes';

function App() {
  return (
    <UnsplashSearchProvider>
      <Routes />
    </UnsplashSearchProvider>
  );
}

export default App;
