import { LocationGeocodedLocation } from "expo-location";
import Tag from "./Tag";

class Item {
  id: string;

  title: string;

  address: string;

  hasVisited?: boolean = false;

  coordinates: LocationGeocodedLocation;

  description?: string;

  rating?: number;

  priority?: number;

  tag?: Tag["name"];

  favourite?: boolean = false;

  createdOn: number;

  updatedOn?: number;

  distance?: number; // distance in km from current location

  constructor(item: Item) {
    this.id = item.id;

    this.title = item.title;

    this.address = item.address;

    this.coordinates = item.coordinates;

    this.createdOn = item.createdOn;

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
