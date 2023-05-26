class Item {
  title: string;

  address: string;

  hasVisited = false;

  coordinates?: [number, number];

  description?: string;

  rating?: number; // out of 5?

  priority?: number; // out of 3?

  tag?: string;

  favourite? = false;

  createdOn: number;

  updatedOn?: number;

  constructor(item: Item) {
    this.title = item.title;
    this.address = item.address;
    if (item.hasVisited) this.hasVisited = true;
    if (item.description) this.description = item.description;
    if (item.rating) this.rating = item.rating;
    if (item.priority) this.priority = item.priority;
    if (item.tag) this.tag = item.tag;
    if (item.favourite) this.favourite = true;

    this.createdOn = Date.now();
  }
}

export default Item;
