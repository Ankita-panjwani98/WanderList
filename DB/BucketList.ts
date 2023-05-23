import Item from "./Item";

class BucketList {
  items: Item[] = [];

  constructor(items: Item[]) {
    this.items = items;
  }

  add(item: Item) {
    this.items.push(item);
  }
}

export default BucketList;
