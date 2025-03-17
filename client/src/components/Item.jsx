import axios from "axios";
import React, { useEffect, useState } from "react";
import IconDeleteForeverOutline from "~icons/mdi/delete-forever-outline";
import IconPencilOutline from "~icons/mdi/pencil-outline";
import IconArrowURightTopBold from "~icons/mdi/arrow-u-right-top-bold";
import IconContentSave from "~icons/mdi/content-save";

function Item({ item, allItems, setAllItems }) {
  const [currentItem, setCurrentItem] = useState({
    id: null,
    title: null,
    description: null,
    isComplete: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_SERVICE_LOCATION + "/items/" + id
      );
      setDeleteOpen(false);
      const itemIndex = allItems.findIndex((e) => item.id === e.id);
      if (itemIndex > -1) {
        const changedItems = allItems.toSpliced(itemIndex, 1);
        setAllItems(changedItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelEdit = () => {
    setEditOpen(false);
    setCurrentItem({
      id: item.id,
      title: item.title,
      description: item.description,
      isComplete: item.isComplete,
    });
  };

  const updateItem = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_SERVICE_LOCATION + "/items/" + item.id,
        currentItem
      );
      setEditOpen(false);
      const itemIndex = allItems.findIndex((e) => item.id === e.id);
      if (itemIndex > -1) {
        const changedItems = allItems.toSpliced(itemIndex, 1, currentItem);
        setAllItems(changedItems);
      } else {
        setAllItems([...allItems, currentItem]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCurrentItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (
      !editOpen &&
      currentItem.id !== null &&
      currentItem?.isComplete !== item?.isComplete
    ) {
      updateItem();
    }
  }, [currentItem]);

  useEffect(() => {
    if (item && !isLoaded) {
      setCurrentItem({
        id: item.id,
        title: item.title,
        description: item.description,
        isComplete: item.isComplete,
      });
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <div
      className={
        "w-11/12 mx-4 p-4 not-last:border-b border-b-slate-700 flex justify-between " +
        (currentItem && currentItem.isComplete ? "bg-slate-100" : "")
      }
    >
      <div className="m-2 flex text-white">
        <input
          type="checkbox"
          checked={currentItem?.isComplete}
          onChange={() =>
            setCurrentItem({
              ...currentItem,
              isComplete: !currentItem?.isComplete,
            })
          }
          className="cursor-pointer relative peer shrink-0 appearance-none w-8 h-8
            border-2 border-slate-400 rounded-sm bg-white hover:bg-slate-100
            mt-1 checked:bg-green-800 checked:border-0 checked:hover:bg-green-700
            focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-slate-100
            disabled:border-slate-400 disabled:bg-slate-400"
        />
        <svg
          className="absolute w-7 h-7 mt-1.5
            hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      {!editOpen ? (
        <div className="min-w-0 grow-[3] flex flex-col justify-center break-words">
          <h2 className="text-xl font-semibold text-slate-800">{item.title}</h2>
          {currentItem?.description && <p>{item.description}</p>}
        </div>
      ) : (
        <div className="min-w-0 grow-[3] flex gap-2 flex-col justify-center break-words">
          <input
            type="text"
            placeholder="title"
            onChange={handleChange}
            value={currentItem.title}
            maxLength="45"
            name="title"
            className="text-xl border bg-white p-1 rounded-lg"
          />
          <textarea
            placeholder="description"
            onChange={handleChange}
            value={currentItem.description}
            maxLength="255"
            name="description"
            className="border bg-white p-1 rounded-t-lg rounded-bl-lg"
          />
        </div>
      )}
      {!editOpen && !deleteOpen && (
        <div className="flex m-2 gap-x-2">
          <button
            className="w-8 h-8 rounded-sm mt-1 bg-amber-600 flex justify-center items-center text-white cursor-pointer hover:bg-amber-500"
            onClick={() => setEditOpen(true)}
          >
            <IconPencilOutline className="text-2xl" />
          </button>
          <button
            className="w-8 h-8 rounded-sm mt-1 bg-red-800 flex justify-center items-center text-white cursor-pointer hover:bg-red-700"
            onClick={() => setDeleteOpen(true)}
          >
            <IconDeleteForeverOutline className="text-2xl" />
          </button>
        </div>
      )}
      {deleteOpen && (
        <div className="flex flex-col mx-2 items-end">
          <p className="text-sm text-slate-600 self-center">Delete?</p>
          <div className="flex gap-x-2">
            <button
              className="w-8 h-8 rounded-sm mt-1 bg-red-800 flex justify-center items-center text-white cursor-pointer hover:bg-red-700"
              onClick={() => handleDelete(item.id)}
            >
              <IconDeleteForeverOutline className="text-2xl" />
            </button>
            <button
              className="w-8 h-8 rounded-sm mt-1 bg-slate-500 flex justify-center items-center text-white cursor-pointer hover:bg-slate-600"
              onClick={() => setDeleteOpen(false)}
            >
              <IconArrowURightTopBold className="text-2xl" />
            </button>
          </div>
        </div>
      )}
      {editOpen && (
        <div className="flex flex-col mx-2 items-end">
          <p className="text-sm text-slate-600 self-center">Update?</p>
          <div className="flex gap-x-2">
            <button
              className="w-8 h-8 rounded-sm mt-1 bg-sky-800 flex justify-center items-center text-white cursor-pointer hover:bg-sky-700"
              onClick={updateItem}
            >
              <IconContentSave className="text-2xl" />
            </button>
            <button
              className="w-8 h-8 rounded-sm mt-1 bg-slate-500 flex justify-center items-center text-white cursor-pointer hover:bg-slate-600"
              onClick={cancelEdit}
            >
              <IconArrowURightTopBold className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
