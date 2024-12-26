import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

const App = () => {
  const [items, setItems] = useState([]);

  const numItems = items.length;

  const handleClearAll = () => setItems([]);

  const handleButton = (item) =>
    setItems((items) => {
      return items.filter((arritem) => arritem.id !== item.id);
    });

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleAddItems = (item) =>
    setItems((items) => {
      return [...items, item];
    });

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        removeAll={handleClearAll}
        items={items}
        onRemove={handleButton}
        onToggle={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
