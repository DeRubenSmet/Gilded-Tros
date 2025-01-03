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

  test("should update quality correctly for Good Wine", () => {
    const goodWine = items.find((item) => item.name === "Good Wine");
    if (goodWine) {
      const initialQuality = goodWine.quality;
      const initialSellIn = goodWine.sellIn;
      app.updateQuality();

      expect(goodWine.quality).toBe(initialQuality + 1); // Increased by 1
      expect(goodWine.sellIn).toBe(initialSellIn - 1);

      goodWine.sellIn = -1;
      app.updateQuality(); // SellIn goes below 0

      expect(goodWine.quality).toBe(initialQuality + 2); // Increased again after sellIn < 0
    }
  });

  test("should not change quality of Legendary item", () => {
    const legendaryItem = items.find((item) => item.name === "B-DAWG Keychain");
    if (legendaryItem) {
      const initialQuality = legendaryItem.quality;
      const initialSellIn = legendaryItem.sellIn;
      app.updateQuality();

      expect(legendaryItem.quality).toBe(initialQuality); // Legendary item should not change
      expect(legendaryItem.sellIn).toBe(initialSellIn); // SellIn should stay the same
    }
  });
});
