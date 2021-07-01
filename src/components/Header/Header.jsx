import Logo from '@components/Logo';
import SearchBar from '@components/SearchBar';
import { useParams, useHistory } from 'react-router-dom';
import { useUnsplashSearch } from '@contexts/search-context';
import { useEffect } from 'react';

function Header() {
  const { query = '' } = useParams();
  const history = useHistory();
  const { setSearchQuery } = useUnsplashSearch();

  useEffect(() => setSearchQuery(query), [query, setSearchQuery]);

  return (
    <header className="app-header">
      <nav className="app-nav">
        <a className="app-logo" href="/">
          <Logo />
        </a>
        <div className="nav-search">
          <SearchBar
            placeholder="Search free high-resolution photos"
            defaultValue={query}
            onSubmit={(value) => history.push(`/s/photos/${value}`)}
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
