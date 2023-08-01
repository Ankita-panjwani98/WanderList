import { IconGreen, IconGrey } from "../components/Media";
import Item from "../DB/Item";

export default function getIconForItem(item: Item) {
  if (item.hasVisited) return IconGreen;
  return IconGrey;
}
