import { Item } from "./item";

const SMELLY_ITEMS = ["Duplicate Code", "Long Methods", "Ugly Variable Names"];

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private updateGoodWine(item: Item): void {
    //Method to update "Good Wine"
    item.quality = Math.min(MAX_QUALITY, item.quality + 1);
    item.sellIn--;
  }

  private updateRegularItem(item: Item): void {
    //Method to update "Smelly Items" & "Regular Items"
    const qualityDecrease = SMELLY_ITEMS.includes(item.name) ? 2 : 1;
    // If sellIn < 0, decrease quality, but for "Smelly Items" decrease quality twice as fast
    if (item.sellIn <= 0) {
      item.quality = item.quality - qualityDecrease * 2;
      item.sellIn--;
    } else {
      item.quality = Math.max(MIN_QUALITY, item.quality - qualityDecrease);
      item.sellIn--;
    }
  }

  public updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Good Wine" &&
        this.items[i].name != "Backstage passes for Re:Factor" &&
        this.items[i].name != "Backstage passes for HAXX"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "B-DAWG Keychain") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;

          if (this.items[i].name == "Backstage passes for Re:Factor") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].name != "B-DAWG Keychain") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Good Wine") {
          if (
            this.items[i].name != "Backstage passes for Re:Factor" ||
            this.items[i].name != "Backstage passes for HAXX"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "B-DAWG Keychain") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
  }
}
