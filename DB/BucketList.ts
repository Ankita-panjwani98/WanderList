import Item from "./Item";

class BucketList {
  items: Item[] = [];

  constructor(items: Item[]) {
    this.items = items;
  }
}

export default BucketList;
