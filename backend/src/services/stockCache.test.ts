import * as cache from './stockCache';

test('StockCache caches stocks with timestamp', () => {
  const item: cache.CacheItem = {
    name: 'NOKIA',
    ask: 123.00,
    bid: 122.00,
    prevAsk: undefined
  };
  cache.set(item);
  const cachedItem = cache.get(item.name);
  expect(cachedItem).toBeDefined();

  const timestamp = cachedItem?.[1];
  expect(typeof timestamp).toBe('number');

  const cached = cachedItem?.[0];
  expect(cached).toEqual(item);
});

test('StockCache updates prevAsk for items', () => {
  const item: cache.CacheItem = {
    name: 'NOKIA',
    ask: 123.00,
    bid: 122.00,
    prevAsk: undefined
  };
  cache.set(item);
  const newItem = { ...item };
  newItem.ask = 145.00;
  newItem.bid = 142.00;
  cache.set(newItem);

  const cachedItem = cache.get(item.name);
  expect(cachedItem?.[0].ask).toEqual(145.00);
  expect(cachedItem?.[0].prevAsk).toEqual(123.00);
});
