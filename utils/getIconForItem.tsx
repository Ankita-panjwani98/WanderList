import { IconBlue, IconGold, IconGreen, IconGrey } from "../components/Media";
import Item from "../DB/Item";

export default function getIconForItem(item: Item) {
  if (item.favourite) {
    if (item.hasVisited) return IconBlue;
    return IconGold;
  }
  if (item.hasVisited) return IconGreen;
  return IconGrey;
}
