export type StockType = {
  name: string,
  ask: number | undefined,
  prevAsk: number | undefined,
  bid: number | undefined
}

const cache = new Map<string, [StockType, number]>();

export const set = (item: StockType) => {
  const prevItem = cache.get(item.name);
  if (prevItem) {
    const stock = prevItem[0];
    stock.prevAsk = stock.ask;
    stock.ask = item.ask;
    stock.bid = item.bid;
    cache.set(stock.name, [stock, Date.now()]);
  } else {
    cache.set(item.name, [item, Date.now()]);
  }
};

export const get = (name: string) => {
  return cache.get(name);
};
