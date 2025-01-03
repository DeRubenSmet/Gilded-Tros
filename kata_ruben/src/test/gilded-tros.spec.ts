import { Item } from "../classes/item";
import { GildedTros, MAX_QUALITY, MIN_QUALITY } from "../classes/gilded-tros";
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

      expect(goodWine.quality).toEqual(
        Math.min(MAX_QUALITY, initialQuality + 1)
      ); //Quality increased by 1
      expect(goodWine.sellIn).toEqual(initialSellIn - 1);

      goodWine.sellIn = -1; //SellIn goes below 0
      app.updateQuality();

      expect(goodWine.quality).toEqual(
        Math.min(MAX_QUALITY, initialQuality + 2)
      ); //Quality increased again after sellIn < 0
    }
  });

  test("should not change quality of Legendary item", () => {
    const legendaryItem = items.find((item) => item.name === "B-DAWG Keychain");
    if (legendaryItem) {
      const initialQuality = legendaryItem.quality;
      app.updateQuality();

      expect(legendaryItem.quality).toEqual(initialQuality); //Legendary item should not change
      expect(legendaryItem.sellIn).toEqual(0); //SellIn should stay the same
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
      expect(backstagePass.quality).toEqual(
        Math.min(MAX_QUALITY, initialQuality + 1)
      );
      expect(backstagePass.sellIn).toEqual(
        Math.max(MIN_QUALITY, initialSellIn - 1)
      );

      backstagePass.sellIn = 9; //SellIn goes below 10
      app.updateQuality();

      //Quality should increase by 1 because sellIn > 5
      expect(backstagePass.quality).toEqual(
        Math.min(MAX_QUALITY, initialQuality + 3)
      );
      expect(backstagePass.sellIn).toEqual(8);

      backstagePass.sellIn = 4; //SellIn goes below 5
      app.updateQuality();

      //Quality should increase by 1 because sellIn < 5
      expect(backstagePass.quality).toEqual(
        Math.min(MAX_QUALITY, initialQuality + 6)
      );
      expect(backstagePass.sellIn).toEqual(3);

      backstagePass.sellIn = 0; //SellIn goes below 0
      app.updateQuality();

      //Quality should be 0 after expiry
      expect(backstagePass.quality).toEqual(0);
    }
  });
  test("should degrade quality of regular items correctly", () => {
    const regularItem = items.find((item) => item.name === "Regular Item");
    if (regularItem) {
      const initialQuality = regularItem.quality;
      const initialSellIn = regularItem.sellIn;
      app.updateQuality();

      expect(regularItem.quality).toBe(
        Math.max(MIN_QUALITY, initialQuality - 1)
      ); //Quality decreased by 1
      expect(regularItem.sellIn).toBe(initialSellIn - 1);

      regularItem.sellIn = -1; //SellIn goes below 0
      app.updateQuality();
      expect(regularItem.quality).toBe(
        Math.max(MIN_QUALITY, initialQuality - 3)
      ); //Quality decreased by 2 after sellIn < 0
    }
  });

  test("should degrade quality of smelly items twice as fast", () => {
    //Create copy of items
    const smellyItems = items
      .filter((item) =>
        ["Duplicate Code", "Long Methods", "Ugly Variable Names"].includes(
          item.name
        )
      )
      .map((item) => new Item(item.name, item.sellIn, item.quality)); //Create copy of each item

    smellyItems.forEach((smellyItem) => {
      const initialQuality = smellyItem.quality;
      const initialSellIn = smellyItem.sellIn;

      //Update items
      const appCopy = new GildedTros([smellyItem]); //Create new instance of GildedTros for the test
      appCopy.updateQuality();

      //Smelly items degrade twice as fast (quality -2)
      expect(smellyItem.quality).toBe(
        Math.max(MIN_QUALITY, initialQuality - 2)
      );
      expect(smellyItem.sellIn).toBe(initialSellIn - 1);

      smellyItem.sellIn = -1; //SellIn goes below 0

      appCopy.updateQuality();

      //Smelly items zouden nu met 4 meer moeten degraderen (2 voor reguliere afname en 2 extra voor verval)
      //Smelly items degrade twice as fast after expiry (quality -4)
      expect(smellyItem.quality).toBe(
        Math.max(MIN_QUALITY, initialQuality - 6)
      ); //Initial quality -2 for the first update, -4 for the second update
    });
  });
});
