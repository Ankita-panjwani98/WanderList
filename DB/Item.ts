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
    this.id = item.id ?? Item.generateUUID();

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

  static generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0; // eslint-disable-line no-bitwise
      const v = c === "x" ? r : (r & 0x3) | 0x8; // eslint-disable-line no-bitwise
      return v.toString(16);
    });
  }
}

export default Item;

// import { v4 as uuidv4 } from "uuid";

// export class Item {
//   id: string;
//   title: string;
//   address: string;
//   hasVisited: boolean;
//   coordinates?: [number, number];
//   description?: string;
//   rating?: number;
//   priority?: number;
//   tag?: string;
//   favourite: boolean;
//   createdOn: number;
//   updatedOn?: number;

//   constructor(item: Item) {
//     this.id = uuidv4();
//     this.title = item.title;
//     this.address = item.address;
//     this.hasVisited = item.hasVisited || false;
//     this.coordinates = item.coordinates;
//     this.description = item.description;
//     this.rating = item.rating;
//     this.priority = item.priority;
//     this.tag = item.tag;
//     this.favourite = item.favourite || false;
//     this.createdOn = Date.now();
//     this.updatedOn = item.updatedOn;
//   }
// }

// // export default Item;

// // // import { v4 as uuidv4 } from "react-native-uuid";

// // function uuidv4() {
// //   var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
// //   return uuid.replace(/[xy]/g, function (c) {
// //     var r = (Math.random() * 16) | 0;
// //     var v = c === "x" ? r : (r & 0x3) | 0x8;
// //     return v.toString(16);
// //   });
// // }

// // export class Item {
// //   id: string;

// //   title: string;

// //   address: string;

// //   hasVisited = false;

// //   coordinates?: [number, number];

// //   description?: string;

// //   rating?: number; // out of 5?

// //   priority?: number; // out of 3?

// //   tag?: string;

// //   favourite? = false;

// //   createdOn: number;

// //   updatedOn?: number;

// //   constructor(item: Item) {
// //     this.id = uuidv4();
// //     this.title = item.title;
// //     this.address = item.address;
// //     if (item.hasVisited) this.hasVisited = true;
// //     if (item.description) this.description = item.description;
// //     if (item.rating) this.rating = item.rating;
// //     if (item.priority) this.priority = item.priority;
// //     if (item.tag) this.tag = item.tag;
// //     if (item.favourite) this.favourite = true;

// //     this.createdOn = Date.now();
// //   }
// // }
