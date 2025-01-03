import { Item } from "../classes/item";
import { GildedTros } from "../classes/gilded-tros";
import { initialItems } from "../App";

describe("GildedTrosTest", () => {
  let items: Item[] = [];
  let app: GildedTros;

  beforeEach(() => {
    //Make new instance of GildedTros for every test
    items = initialItems;
    app = new GildedTros(items);
  });
});
