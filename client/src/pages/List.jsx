import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../components/Item";
import AddItemAndFilterBar from "../components/AddItemAndFilterBar";

const List = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(2);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVICE_LOCATION + "/items"
        );
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllItems();
  }, []);

  useEffect(() => {
    const filteredList = items.filter((e) => {
      switch (filter) {
        case 0:
          return !e.isComplete;
        case 1:
          return e.isComplete;
        case 2:
          return true;
        default:
          console.log("error in filter");
          return false;
      }
    });
    setFilteredItems(filteredList);
  }, [items, filter]);

  return (
    <div className="max-w-[800px] w-10/12 max-h-10/12 overflow-auto m-auto bg-white shadow-2xl rounded-2xl px-16 py-8">
      <h1 className="text-3xl font-bold pb-8 mb-8 text-center text-slate-700 border-b-2 border-b-slate-700">
        Task List
      </h1>
      <AddItemAndFilterBar
        filter={filter}
        setFilter={setFilter}
        allItems={items}
        setAllItems={setItems}
      />
      <div>
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            allItems={items}
            setAllItems={setItems}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
