import PropTypes from 'prop-types';
import { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { default as SearchIcon } from '@assets/svgs/search.svg';
import { default as CrossIcon } from '@assets/svgs/cross.svg';
import SearchSuggestion from './SearchSuggestion';
import useRecentSearches from '@hooks/useRecentSearches';
import useClickAway from '@hooks/useClickAway';

function SearchBar({
  placeholder,
  hideClear,
  jumbo,
  rounded,
  showSuggestions,
  defaultValue,
  onSubmit,
  onChange,
}) {
  const containerRef = useRef();
  const inputRef = useRef();
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [hasInputFocus, setInputFocus] = useState(false);
  const { setRecentSearches } = useRecentSearches();

  useClickAway({
    root: containerRef,
    callback: () => {
      setSuggestionVisible(false);
    },
  });

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!value) return;

      setRecentSearches(value);
      onSubmit && onSubmit(value);
    },
    [value, onSubmit, setRecentSearches],
  );

  useEffect(() => setValue(defaultValue || ''), [defaultValue]);

  useEffect(() => {
    if (hasInputFocus && !value) {
      setSuggestionVisible(true);
    } else if (value) {
      setSuggestionVisible(false);
    }
  }, [value, hasInputFocus]);

  return (
    <S.Container data-aid="search-bar" ref={containerRef}>
      <S.Form onSubmit={onSearchSubmit} jumbo={jumbo} rounded={rounded}>
        <S.Submit type="submit">
          <S.SearchIcon width={24} height={24} />
        </S.Submit>
        <S.Input
          data-aid="input"
          jumbo={jumbo}
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onFocus={(_) => setInputFocus(true)}
          onBlur={(_) => setInputFocus(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && hasInputFocus) {
              setInputFocus(false);

              setSuggestionVisible(false);
              inputRef.current.blur();
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);

            onChange && onChange(e.target.value);
          }}
        />
        {!hideClear && !!value && (
          <S.Clear
            data-aid="clear-input"
            onClick={(_) => {
              inputRef.current.focus();
              setValue('');
              setSuggestionVisible(true);
            }}
            type="button"
          >
            <S.CrossIcon jumbo={jumbo} />
          </S.Clear>
        )}
      </S.Form>

      {showSuggestions && (
        <SearchSuggestion
          visible={isSuggestionVisible || (hasInputFocus && !value)}
        />
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    position: relative;
  `,
  Form: styled.form`
    height: ${({ jumbo }) => (jumbo ? '54px' : '40px')};
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: ${({ rounded }) => (rounded ? '4px' : '24px')};
    background-color: #eee;
    border: 1px solid transparent;
    transition: background 0.3s, border 0.3s;
    padding: 0 1rem;

    &:focus-within {
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
    font-size: ${({ jumbo }) => (jumbo ? '1rem' : '0.9rem')};
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
  CrossIcon: styled(CrossIcon)`
    width: ${({ jumbo }) => (jumbo ? '18px' : '16px')};
    height: ${({ jumbo }) => (jumbo ? '18px' : '16px')};
  `,
  SearchIcon: styled(SearchIcon)`
    vertical-align: middle;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  `,
};

SearchBar.defaultProps = {
  placeholder: 'Search...',
  defaultValue: '',
  jumbo: false,
  rounded: false,
  showSuggestions: false,
};

SearchBar.propTypes = {
  jumbo: PropTypes.bool,
  rounded: PropTypes.bool,
  showSuggestions: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  hideClear: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchBar;
