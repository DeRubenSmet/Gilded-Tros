import React, { useState } from "react";
import { Item } from "../classes/item";
import { GildedTros } from "../classes/gilded-tros";

interface GildedTrosComponentProps {
  initialItems: Item[];
}

const GildedTrosComponent: React.FC<GildedTrosComponentProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const updateItems = () => {
    const gildedTros = new GildedTros(items);
    gildedTros.updateQuality();
    setItems([...gildedTros.items]);
  };

  return (
    <div>
      <h1>Gilded Tros Inventory</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Sell In: {item.sellIn}, Quality: {item.quality}
          </li>
        ))}
      </ul>
      <button onClick={updateItems}>Update Quality</button>
    </div>
  );
};

export default GildedTrosComponent;
