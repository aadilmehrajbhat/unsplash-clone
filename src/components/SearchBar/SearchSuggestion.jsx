import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import getValue from 'lodash/get';
import { fetchUnsplashSearchSuggestions } from '@services/unsplash-api';
import SuggestionList from './SuggestionList';
import { default as TrendIcon } from '@assets/svgs/trend.svg';
import useRecentSearches from '@hooks/useRecentSearches';
import useMount from '@hooks/useMount';
import useSearchSuggestions from '@hooks/useSearchSuggestions';

function SearchSuggestion({ visible = false }) {
  const { trendingSearches } = useSearchSuggestions();
  const { recentSearches, clearRecentSearches } = useRecentSearches();
  const isCSR = useMount();

  if (!isCSR) return null;

  return (
    <S.Suggestions
      data-aid="search-suggestion"
      visible={visible && trendingSearches?.length}
    >
      {Array.isArray(recentSearches) && recentSearches.length ? (
        <SuggestionList
          data-aid="recent-searches"
          title={
            <>
              Search suggestions
              <S.ClearRecentSearches
                data-aid="clear"
                onClick={clearRecentSearches}
              >
                {' '}
                &middot;Clear
              </S.ClearRecentSearches>
            </>
          }
          suggestions={recentSearches}
        />
      ) : null}
      {trendingSearches && (
        <SuggestionList
          data-aid="trending-searches"
          title="Trending Searches"
          suggestions={trendingSearches}
          startAdornment={<S.TrendIcon />}
        />
      )}
    </S.Suggestions>
  );
}

const S = {
  Suggestions: styled.div`
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
    pointer-events: ${(props) => (!props.visible ? 'none' : '')};
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 350ms;
    position: absolute;
    background: white;
    padding: 1em 1em;
    width: 100%;
    left: 0;
    top: 110%;
    z-index: 1;
    border: 1px solid ${(props) => props.theme.colors.grey};
    border-radius: 4px;
  `,
  ClearRecentSearches: styled.button`
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
  `,

  TrendIcon: styled(TrendIcon)`
    width: 18px;
    height: 18px;
    line-height: 1;
    fill: currentColor;
  `,
};

export default SearchSuggestion;
