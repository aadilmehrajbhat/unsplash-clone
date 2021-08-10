import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import getValue from 'lodash/get';
import { fetchUnsplashSearchSuggestions } from '@services/unsplash-api';
import SuggestionList from './SuggestionList';
import { default as TrendIcon } from '@assets/svgs/trend.svg';
import useRecentSearches from '@hooks/useRecentSearches';

const StyledSearchSuggestion = styled.div`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: absolute;
  background: white;
  padding: 1em 1em;
  width: 100%;
  left: 0;
  top: 110%;
  z-index: 1;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
`;

const StyledTrendIcon = styled(TrendIcon)`
  width: 18px;
  height: 18px;
  line-height: 1;
  fill: currentColor;
`;

const ClearRecentSearches = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  color: #767676;
  font-size: inherit;
  font-family: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

function SearchSuggestion({ visible = false }) {
  const [suggestions, setSuggestions] = useState(null);
  const { recentSearches, clearRecentSearches } = useRecentSearches();

  useEffect(() => {
    fetchUnsplashSearchSuggestions().then(setSuggestions).catch(console.log);
  }, []);

  const trendingSearches = useMemo(() => {
    return getValue(suggestions, 'trendingSearches', null);
  }, [suggestions]);

  if (!trendingSearches) return null;

  return (
    <StyledSearchSuggestion visible={visible}>
      {Array.isArray(recentSearches) && recentSearches.length ? (
        <SuggestionList
          title={
            <>
              Search suggestions &middot;
              <ClearRecentSearches onClick={clearRecentSearches}>
                Clear
              </ClearRecentSearches>
            </>
          }
          suggestions={recentSearches}
        />
      ) : null}
      {trendingSearches && (
        <SuggestionList
          title="Trending Searches"
          suggestions={trendingSearches}
          startAdornment={<StyledTrendIcon />}
        />
      )}
    </StyledSearchSuggestion>
  );
}

export default SearchSuggestion;
