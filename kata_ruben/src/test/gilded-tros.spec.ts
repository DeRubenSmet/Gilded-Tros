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

      expect(goodWine.quality).toEqual(initialQuality + 1); //Quality increased by 1
      expect(goodWine.sellIn).toEqual(initialSellIn - 1);

      goodWine.sellIn = -1; //SellIn goes below 0
      app.updateQuality();

      expect(goodWine.quality).toEqual(initialQuality + 2); //Quality increased again after sellIn < 0
    }
  });

  test("should not change quality of Legendary item", () => {
    const legendaryItem = items.find((item) => item.name === "B-DAWG Keychain");
    if (legendaryItem) {
      const initialQuality = legendaryItem.quality;
      const initialSellIn = legendaryItem.sellIn;
      app.updateQuality();

      expect(legendaryItem.quality).toEqual(initialQuality); //Legendary item should not change
      expect(legendaryItem.sellIn).toEqual(initialSellIn); //SellIn should stay the same
    }
  });

  test("should update quality for Backstage passes correctly", () => {
    const backstagePass = items.find(
      (item) => item.name === "Backstage passes for Re:Factor"
    );
    if (backstagePass) {
      const initialQuality = backstagePass.quality;
      const initialSellIn = backstagePass.sellIn;

      app.updateQuality();

      //Quality should increase by 1 because sellIn > 10
      expect(backstagePass.quality).toEqual(initialQuality + 1);
      expect(backstagePass.sellIn).toEqual(initialSellIn - 1);

      backstagePass.sellIn = 9; //SellIn goes below 10
      app.updateQuality();

      //Quality should increase by 1 because sellIn > 5
      expect(backstagePass.quality).toEqual(initialQuality + 3);
      expect(backstagePass.sellIn).toEqual(8);

      backstagePass.sellIn = 4; //SellIn goes below 5
      app.updateQuality();

      //Quality should increase by 1 because sellIn < 5
      expect(backstagePass.quality).toEqual(initialQuality + 6);
      expect(backstagePass.sellIn).toEqual(3);

      //Simulate the passes expiring
      backstagePass.sellIn = 0;
      app.updateQuality();

      //Quality should be 0 after expiry
      expect(backstagePass.quality).toEqual(0);
    }
  });
});
