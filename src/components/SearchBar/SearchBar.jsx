import PropTypes from 'prop-types';
import { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { default as SearchIcon } from '@assets/svgs/search.svg';
import { default as CrossIcon } from '@assets/svgs/cross.svg';
import SearchSuggestion from './SearchSuggestion';
import useRecentSearches from '@hooks/useRecentSearches';

function SearchBar({
  placeholder,
  hideClear,
  defaultValue,
  onSubmit,
  onChange,
}) {
  const inputRef = useRef();
  const [value, setValue] = useState(defaultValue);
  const [hasInputFocus, setInputFocus] = useState(false);
  const { setRecentSearches } = useRecentSearches();

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setRecentSearches(value);
      onSubmit && onSubmit(value);
    },
    [value, onSubmit, setRecentSearches],
  );

  useEffect(() => setValue(defaultValue || ''), [defaultValue]);

  return (
    <S.Container>
      <S.Form onSubmit={onSearchSubmit} data-testid="search-bar">
        <S.Submit type="submit">
          <S.SearchIcon width={24} height={24} />
        </S.Submit>
        <S.Input
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onFocus={(_) => setInputFocus(true)}
          onBlur={(_) => setInputFocus(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && hasInputFocus) {
              setInputFocus(false);
              inputRef.current.blur();
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
          data-testid="input"
        />
        {!hideClear && !!value && (
          <S.Clear
            onClick={(_) => setValue('')}
            type="button"
            data-testid="clear-input"
          >
            <CrossIcon width={16} height={16} />
          </S.Clear>
        )}
      </S.Form>
      <SearchSuggestion visible={hasInputFocus && !value} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    position: relative;
  `,
  Form: styled.form`
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 24px;
    background-color: #eee;
    border: 1px solid transparent;
    transition: background 0.3s, border 0.3s;
    padding: 0 1rem;

    &::focus-within {
      background: #fff;
      border-color: #d1d1d1;
    }
  `,
  Input: styled.input`
    background: transparent;
    width: 100%;
    display: inline-block;
    height: 100%;
    border: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: #111;
    outline: none;
  `,
  Submit: styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    line-height: 1;
    padding: 0 0.7em 0 0;
    outline: none;
  `,
  Clear: styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    line-height: 1;
    padding: 0 0 0 0.7em;
    outline: none;
  `,
  SearchIcon: styled(SearchIcon)`
    vertical-align: middle;
  `,
};

SearchBar.defaultProps = {
  placeholder: 'Search...',
  defaultValue: '',
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  hideClear: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchBar;
