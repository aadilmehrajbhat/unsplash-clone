import { render } from '@testing-library/react';
import MasonryGrid from '../MasonryGrid';
describe('MasonryGrid component', () => {
  const children = [1, 2, 3, 4, 5].map((i) => <span key={i}>{i}</span>);
  const breakpoints = [
    { width: 760, columns: 2 },
    { width: 960, columns: 3 },
  ];

  it('should render as expected', () => {
    const { container } = render(<MasonryGrid>{children}</MasonryGrid>);
    expect(container.getElementsByClassName('masonry-column').length).toBe(1);
    expect(container.querySelectorAll('.masonry-column span').length).toBe(
      children.length,
    );
  });

  it('should render columns based on breakpoints as expected', () => {
    const { container } = render(
      <MasonryGrid breakpoints={breakpoints}>{children}</MasonryGrid>,
    );

    expect(container.getElementsByClassName('masonry-column').length).toBe(3);
  });

  it('should render items in same order in row as expected', () => {
    const { container } = render(
      <MasonryGrid breakpoints={breakpoints}>{children}</MasonryGrid>,
    );

    const columns = container.getElementsByClassName('masonry-column');
    const [firstColumn, secondColumn, thirdColumn] = columns;

    expect(firstColumn.querySelectorAll('span').length).toBe(2);
    expect(secondColumn.querySelectorAll('span').length).toBe(2);
    expect(thirdColumn.querySelectorAll('span').length).toBe(1);
    expect(secondColumn.querySelector('span').textContent).toBe('2');
  });
});
