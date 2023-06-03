import generateUUID from "../utils/generateUUID";

class Item {
  id: string;

  title: string;

  address: string;

  hasVisited = false;

  coordinates?: [number, number];

  description?: string;

  rating?: number;

  priority?: number;

  tag?: string;

  favourite = false;

  createdOn: number;

  updatedOn?: number;

  constructor(item: Partial<Item> = {}) {
    this.id = item.id ?? generateUUID();

    this.title = item.title ?? "";

    this.address = item.address ?? "";

    if (item.hasVisited) this.hasVisited = true;

    if (item.description) this.description = item.description;

    if (item.rating) this.rating = item.rating;

    if (item.priority) this.priority = item.priority;

    if (item.tag) this.tag = item.tag;

    if (item.favourite) this.favourite = true;

    this.createdOn = item.createdOn ?? Date.now();
  }
}

export default Item;
