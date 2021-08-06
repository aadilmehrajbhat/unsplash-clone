import { useEffect } from 'react';
import Link from 'next/link';
import Logo from '@components/Logo';
import SearchBar from '@components/SearchBar';
import { useUnsplashSearch } from '@contexts/search-context';
import GithubLink from './GithubLink';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const { search } = router.query;
  const { setSearchQuery } = useUnsplashSearch();

  useEffect(() => setSearchQuery(search), [search, setSearchQuery]);

  return (
    <header className="app-header">
      <nav className="app-nav">
        <div className="app-content">
          <Link href="/">
            <a className="app-logo">
              <Logo />
            </a>
          </Link>
          <div className="nav-search">
            <SearchBar
              placeholder="Search free high-resolution photos"
              defaultValue={search}
              onSubmit={(value) => router.push(`/s/photos/${value}`)}
            />
          </div>
        </div>
        <GithubLink />
      </nav>
    </header>
  );
}

export default Header;
