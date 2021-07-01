import DropdownMenu, { DropdownMenuItem } from '@components/DropdownMenu';
import { useUnsplashSearch } from '@contexts/search-context';

const ORDER_OPTIONS = [
  { label: 'Relevance', value: 'relevant' },
  { label: 'Newest', value: 'latest' },
];

export const DEFAULT_ORDER = ORDER_OPTIONS[0];

export function getOrderFilterValue(orderFilter) {
  return orderFilter && orderFilter.value !== DEFAULT_ORDER.value
    ? orderFilter.value
    : null;
}

function OrderFilter() {
  const { searchOrder, setSearchOrder } = useUnsplashSearch();

  return (
    <DropdownMenu
      selected={
        <>
          Sort by&nbsp;
          <span style={{ color: '#111' }}>{searchOrder.label}</span>
        </>
      }
    >
      {ORDER_OPTIONS.map(({ label, value }) => (
        <DropdownMenuItem
          key={value}
          value={value}
          checked={searchOrder.value === value}
          onItemClick={(_) => setSearchOrder({ value, label })}
        >
          {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
}

export default OrderFilter;
