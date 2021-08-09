import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { default as SearchIcon } from '@assets/svgs/search.svg';
import { default as CrossIcon } from '@assets/svgs/cross.svg';
import SearchSuggestion from './SearchSuggestion';

const StyledSearchBar = styled.div`
  position: relative;
`;
function SearchBar({
  placeholder,
  hideClear,
  defaultValue,
  onSubmit,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);
  const [hasInputFocus, setInputFocus] = useState(false);

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    },
    [value, onSubmit],
  );

  useEffect(() => setValue(defaultValue || ''), [defaultValue]);

  return (
    <StyledSearchBar>
      <form
        className="search-bar"
        onSubmit={onSearchSubmit}
        data-testid="search-bar"
      >
        <button className="search-bar__submit" type="submit">
          <SearchIcon width={24} height={24} />
        </button>
        <input
          className="search-bar__input"
          type="text"
          placeholder={placeholder}
          value={value}
          onFocus={(_) => setInputFocus(true)}
          onBlur={(_) => setInputFocus(false)}
          onChange={(e) => {
            setValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
          data-testid="input"
        />
        {!hideClear && !!value && (
          <button
            className="search-bar__clear"
            onClick={(_) => setValue('')}
            type="button"
            data-testid="clear-input"
          >
            <CrossIcon width={16} height={16} />
          </button>
        )}
      </form>
      <SearchSuggestion visible={hasInputFocus && !value} />
    </StyledSearchBar>
  );
}

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
