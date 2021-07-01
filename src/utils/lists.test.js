import { uniqueItems, chunk } from './lists';
describe('uniqueItems function', () => {
  const data = [
    { id: 1, value: 'alpha' },
    { id: 2, value: 'beta' },
    { id: 1, value: 'alpha' },
  ];
  it('should remove duplicates as expected', () => {
    expect(uniqueItems(data, 'id').length).toBe(2);
    expect(uniqueItems(data, 'id')).toContain(data[0]);
    expect(uniqueItems(data, 'id')).toContain(data[1]);
  });

  it('should accept function as accessor for keyExtractor', () => {
    expect(uniqueItems(data, (item) => item.id).length).toBe(2);
    expect(uniqueItems(data, (item) => item.id)).toContain(data[0]);
    expect(uniqueItems(data, (item) => item.id)).toContain(data[1]);
  });
});

describe('chunk function', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  it('should make chunks of 3 as expected', () => {
    expect(chunk(data, 3)).toBeArrayOfSize(3);
  });

  it('should make chunks with the same order as expected', () => {
    expect(chunk(data, 3)[0]).toIncludeAllMembers([1, 4, 7]);
    expect(chunk(data, 3)[1]).toIncludeAllMembers([2, 5, 8]);
    expect(chunk(data, 3)[2]).toIncludeAllMembers([3, 6, 9]);
  });

  it('should make single chunk as the same array as expected', () => {
    expect(chunk(data, 1)[0]).toIncludeAllMembers(data);
  });

  it('should return empty chunk for empty error as expected', () => {
    expect(chunk([], 1)).toBeArrayOfSize(1);
    expect(chunk([], 1)[0]).toBeArrayOfSize(0);
  });

  it('should return empty chunks if the size exceeds the array as expected', () => {
    expect(chunk(data, 11)).toBeArrayOfSize(11);
    expect(chunk(data, 11)[9]).toBeArrayOfSize(1);
    expect(chunk(data, 11)[10]).toBeArrayOfSize(0);
    expect(chunk(data, 11)).toIncludeAllMembers([
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9],
      [10],
      [],
    ]);
  });
});
