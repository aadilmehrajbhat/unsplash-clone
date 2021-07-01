import { useMemo } from 'react';
import DropdownMenu, { DropdownMenuItem } from '@components/DropdownMenu';
import { ReactComponent as CheckIcon } from '@assets/svgs/check.svg';
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
    <span className="selected-color-filter">
      <span
        title={colorTone.label}
        className="color-tone"
        style={{
          backgroundColor: colorTone.color,
        }}
      ></span>
      &nbsp;&nbsp;{colorTone.label}
    </span>
  );
}

function ColorFilter() {
  const { searchColor, setSearchColor } = useUnsplashSearch();

  const colorToneItems = useMemo(() => {
    return (
      <div>
        <div>Tones</div>
        <div className="color-tone-filter">
          {COLOR_TONES.map(({ label, value, color }) => (
            <span
              key={value}
              title={label}
              className="color-tone"
              style={{ backgroundColor: color }}
              onClick={(_) =>
                setSearchColor({ ...COLOR_OPTIONS[2], color: value })
              }
            >
              {value === searchColor.color && (
                <span className="color-tone__checked">
                  <CheckIcon
                    width={16}
                    height={16}
                    style={{ fill: value === 'black' ? 'white' : 'black' }}
                  />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
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

export default ColorFilter;
