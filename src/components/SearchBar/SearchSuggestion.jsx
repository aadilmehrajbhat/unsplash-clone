import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import getValue from 'lodash/get';
import { fetchUnsplashSearchSuggestions } from '@services/unsplash-api';
import SuggestionList from './SuggestionList';

const StyledSearchSuggestion = styled.div`
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

function SearchSuggestion({ visible = false }) {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    fetchUnsplashSearchSuggestions().then(setSuggestions).catch(console.log);
  }, []);

  const trendingSearches = useMemo(() => {
    return getValue(suggestions, 'trendingSearches', null);
  }, [suggestions]);

  if (!visible || !trendingSearches) return null;

  return (
    <StyledSearchSuggestion>
      {trendingSearches && (
        <SuggestionList
          title="Trending Searches"
          suggestions={trendingSearches}
        />
      )}
    </StyledSearchSuggestion>
  );
}

export default SearchSuggestion;
