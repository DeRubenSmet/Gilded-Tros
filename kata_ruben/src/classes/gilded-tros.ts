import { Item } from "./item";

const SMELLY_ITEMS = ["Duplicate Code", "Long Methods", "Ugly Variable Names"];

export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    //Method to call updateItem
    this.items.forEach((item) => this.updateItem(item));
  }

  private updateItem(item: Item): void {
    //Method to switch between update methods
    switch (item.name) {
      case "Good Wine":
        this.updateGoodWine(item);
        break;
      case "Backstage passes for Re:Factor":
      case "Backstage passes for HAXX":
        this.updateBackstagePass(item);
        break;
      case "B-DAWG Keychain":
        this.updateLegendaryItem(item);
        break;
      default:
        this.updateRegularItem(item);
        break;
    }
  }

  private updateGoodWine(item: Item): void {
    //Method to update "Good Wine"
    item.quality = Math.min(MAX_QUALITY, item.quality + 1);
    item.sellIn--;
  }

  private updateLegendaryItem(item: Item): void {
    //Method to update "Legendary Item"
    // Legendary item, does not change and never has to be sold
    item.sellIn = 0;
  }

  private updateBackstagePass(item: Item): void {
    //Method to update "Backstage Passes"
    switch (true) {
      case item.sellIn > 10:
        item.quality = Math.min(MAX_QUALITY, item.quality + 1);
        break;
      case item.sellIn > 5:
        item.quality = Math.min(MAX_QUALITY, item.quality + 2);
        break;
      case item.sellIn > 0:
        item.quality = Math.min(MAX_QUALITY, item.quality + 3);
        break;
      default:
        item.quality = MIN_QUALITY; // Expired
        break;
    }
    item.sellIn--;
  }

  private updateRegularItem(item: Item): void {
    //Method to update "Smelly Items" & "Regular Items"
    const qualityDecrease = SMELLY_ITEMS.includes(item.name) ? 2 : 1;
    //If sellIn < 0, decrease quality, but for "Smelly Items" decrease quality twice as fast
    if (item.sellIn <= 0) {
      item.quality = Math.max(MIN_QUALITY, item.quality - qualityDecrease * 2);
      item.sellIn--;
    } else {
      item.quality = Math.max(MIN_QUALITY, item.quality - qualityDecrease);
      item.sellIn--;
    }
  }
}
