export function uniqueItems(data, keyExtractor) {
  const uniqueKeys = new Set();

  const getItemKey = (item) => {
    if (typeof keyExtractor === 'string') {
      return item[keyExtractor];
    } else if (typeof keyExtractor === 'function') {
      return keyExtractor(item);
    }
  };

  return data.filter((item) => {
    const key = getItemKey(item);
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      return true;
    }

    return false;
  });
}

export function chunk(array, size = 1) {
  const result = Array(size)
    .fill(null)
    .map((_) => []);

  array.forEach((item, i) => {
    result[i % size].push(item);
  });
  return result;
}
