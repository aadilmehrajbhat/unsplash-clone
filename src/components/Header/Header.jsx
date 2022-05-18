import { useEffect } from 'react';
import Link from 'next/link';
import Logo from '@components/Logo';
import SearchBar from '@components/SearchBar';
import { useUnsplashSearch } from '@contexts/search-context';
import GithubLink from './GithubLink';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function Header() {
  const router = useRouter();
  const { search } = router.query;
  const { setSearchQuery } = useUnsplashSearch();

  useEffect(() => setSearchQuery(search), [search, setSearchQuery]);

  return (
    <S.Container>
      <S.Nav>
        <S.Main>
          <Link href="/">
            <S.LogoLink>
              <Logo />
            </S.LogoLink>
          </Link>
          <S.SearchContainer>
            <SearchBar
              placeholder="Search free high-resolution photos"
              defaultValue={search}
              onSubmit={(value) => router.push(`/s/photos/${value}`)}
            />
          </S.SearchContainer>
        </S.Main>
        <GithubLink />
      </S.Nav>
    </S.Container>
  );
}

const S = {
  Container: styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1024;
    background: #fff;
    box-shadow: 0 8px 6px -6px rgb(0 0 0 / 9%);
    height: var(--header-height);
    padding: 0 1.2rem;
  `,
  Nav: styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Main: styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 1em;
  `,
  LogoLink: styled.a`
    text-decoration: none;
    color: unset;
    padding: 1em 1.5em 1em 0;
    display: inline-block;
  `,
  SearchContainer: styled.div`
    max-width: 550px;
    width: 100%;
  `,
};

export default Header;
