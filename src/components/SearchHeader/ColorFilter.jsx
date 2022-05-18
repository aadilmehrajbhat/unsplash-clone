import { useMemo } from 'react';
import styled from 'styled-components';
import DropdownMenu, { DropdownMenuItem } from '@components/DropdownMenu';
import { default as CheckIcon } from '@assets/svgs/check.svg';
import { useUnsplashSearch } from '@contexts/search-context';

const COLOR_OPTIONS = [
  { label: 'Any color', value: null },
  { label: 'Black and white', value: 'black_and_white' },
  { label: 'Tones', value: 'tones', color: null },
];

const COLOR_TONES = [
  { label: 'White', value: 'white', color: 'rgb(255, 255, 255)' },
  { label: 'Black', value: 'black', color: 'rgb(77, 77, 77)' },
  { label: 'Yellow', value: 'yellow', color: 'rgb(252, 220, 0)' },
  { label: 'Orange', value: 'orange', color: 'rgb(254, 146, 0)' },
  { label: 'Red', value: 'red', color: 'rgb(244, 78, 59)' },
  { label: 'Purple', value: 'purple', color: 'rgb(123, 100, 255)' },
  { label: 'Magenta', value: 'magenta', color: 'rgb(171, 20, 158)' },
  { label: 'Green', value: 'green', color: 'rgb(164, 221, 0)' },
  { label: 'Teal', value: 'teal', color: 'rgb(104, 204, 202)' },
  { label: 'Blue', value: 'blue', color: 'rgb(0, 156, 224)' },
];

export const DEFAULT_COLOR = COLOR_OPTIONS[0];

export function getColorFilterValue(colorFilter) {
  let color = null;
  if (colorFilter && colorFilter.value !== DEFAULT_COLOR.value) {
    color = colorFilter.color || colorFilter.value;
  }

  return color;
}

function getSelectedToneColor(color) {
  const colorTone = COLOR_TONES.find(({ value }) => value === color);

  return (
    <S.SelectedToneFilter>
      <S.ToneFilterItem
        title={colorTone.label}
        style={{
          backgroundColor: colorTone.color,
        }}
      ></S.ToneFilterItem>
      &nbsp;&nbsp;{colorTone.label}
    </S.SelectedToneFilter>
  );
}

function ColorFilter() {
  const { searchColor, setSearchColor } = useUnsplashSearch();

  const colorToneItems = useMemo(() => {
    return (
      <S.ToneFilter>
        <div>Tones</div>
        <S.ToneFilterContainer>
          {COLOR_TONES.map(({ label, value, color }) => (
            <S.ToneFilterItem
              key={value}
              title={label}
              style={{ backgroundColor: color }}
              onClick={(_) =>
                setSearchColor({ ...COLOR_OPTIONS[2], color: value })
              }
            >
              {value === searchColor.color && (
                <S.ToneFilterChecked value={value} />
              )}
            </S.ToneFilterItem>
          ))}
        </S.ToneFilterContainer>
      </S.ToneFilter>
    );
  }, [searchColor.color, setSearchColor]);

  return (
    <DropdownMenu
      selected={
        searchColor.value !== 'tones'
          ? searchColor.label
          : getSelectedToneColor(searchColor.color)
      }
    >
      {COLOR_OPTIONS.map(({ label, value }) => {
        const isTonesItem = value === 'tones';
        return (
          <DropdownMenuItem
            key={value}
            value={value}
            checked={searchColor.value === value}
            onItemClick={
              (!isTonesItem && ((_) => setSearchColor({ value, label }))) ||
              undefined
            }
            style={
              isTonesItem ? { cursor: 'default', pointerEvents: 'unset' } : null
            }
          >
            {isTonesItem ? colorToneItems : label}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenu>
  );
}

const S = {
  ToneFilter: styled.div`
    cursor: text;
  `,
  ToneFilterContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 4fr);
    grid-row-gap: 0.5rem;
    margin: 0.8em 0;
  `,
  ToneFilterItem: styled.span`
    display: inline-flex;
    width: 18px;
    height: 18px;
    border: 1px solid #cacaca;
    border-radius: 50%;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  `,
  ToneFilterChecked: styled(CheckIcon)`
    line-height: 1;
    display: flex;
    fill: ${({ value }) => (value === 'black' ? 'white' : 'black')};
  `,
  SelectedToneFilter: styled.span`
    display: inline-flex;
    align-items: center;
  `,
  SelectedToneColor: styled.span``,
};

export default ColorFilter;
