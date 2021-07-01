import DropdownMenu, { DropdownMenuItem } from '@components/DropdownMenu';
import { useUnsplashSearch } from '@contexts/search-context';

const ORIENTATION_OPTIONS = [
  { label: 'Any orientation', value: null },
  {
    label: 'Landscape',
    value: 'landscape',
    icon: (
      <span
        style={{
          display: 'inline-block',
          width: '18px',
          height: '12px',
          background: 'rgb(228, 228, 228)',
          border: '1px solid rgb(177, 177, 177)',
          boxSizing: 'border-box',
          margin: '0px 10px 0px 0px',
        }}
      ></span>
    ),
  },
  {
    label: 'Portrait',
    value: 'portrait',
    icon: (
      <span
        style={{
          display: 'inline-block',
          width: '18px',
          height: '12px',
          background: 'rgb(228, 228, 228)',
          border: '1px solid rgb(177, 177, 177)',
          boxSizing: 'border-box',
          transform: 'rotate(90deg)',
          margin: '0px 10px 0px 0px',
        }}
      ></span>
    ),
  },
  {
    label: 'Square',
    value: 'squarish',
    icon: (
      <span
        style={{
          display: 'inline-block',
          width: '18px',
          height: '18px',
          background: 'rgb(228, 228, 228)',
          border: '1px solid rgb(177, 177, 177)',
          boxSizing: 'border-box',
          margin: '0px 10px 0px 0px',
        }}
      ></span>
    ),
  },
];

export const DEFAULT_ORIENTATION = ORIENTATION_OPTIONS[0];

export function getOrientationFilterValue(orientationFilter) {
  return orientationFilter &&
    orientationFilter.value !== DEFAULT_ORIENTATION.value
    ? orientationFilter.value
    : null;
}

function OrientationFilter() {
  const { searchOrientation, setSearchOrientation } = useUnsplashSearch();

  return (
    <DropdownMenu selected={searchOrientation.label}>
      {ORIENTATION_OPTIONS.map(({ label, value, icon = null }) => (
        <DropdownMenuItem
          key={value}
          value={value}
          checked={searchOrientation.value === value}
          onItemClick={(_) => setSearchOrientation({ value, label })}
        >
          {icon} {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
}

export default OrientationFilter;
