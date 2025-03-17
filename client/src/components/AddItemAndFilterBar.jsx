import axios from "axios";
import React, { useEffect, useState } from "react";
import IconPlusCircleOutline from "~icons/mdi/plus-circle-outline";
import IconArrowURightTopBold from "~icons/mdi/arrow-u-right-top-bold";
import IconContentSave from "~icons/mdi/content-save";

function AddItemAndFilterBar({ filter, setFilter, allItems, setAllItems }) {
  const [addNewOpen, setAddNewOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const newItem = {
      title: title,
      description: description,
      isComplete: false,
    };

    await axios
      .post(import.meta.env.VITE_SERVICE_LOCATION + "/items/", newItem)
      .then((data) => {
        setAllItems([...allItems, data.data]);
        setAddNewOpen(false);
      });
    return;
  };

  return (
    <div className="w-full m-auto border-b border-b-slate-700">
      {addNewOpen && (
        <form
          id="new-item"
          onSubmit={handleSubmit}
          className="w-8/12 m-auto min-w-0 mb-8 flex gap-2 flex-col justify-center break-words"
        >
          <input
            type="text"
            placeholder="Title"
            maxLength="45"
            name="title"
            required
            className="text-xl border bg-white p-1 rounded-lg"
          />
          <textarea
            placeholder="description"
            maxLength="255"
            name="description"
            className="border bg-white p-1 rounded-t-lg rounded-bl-lg"
          />
        </form>
      )}
      <div className="flex justify-between">
        <div className="flex justify-around text-sm text-slate-600">
          <button
            className={
              "border-r border-r-slate-700 px-2 " +
              (filter === 0
                ? "text-slate-900 font-semibold"
                : "hover:text-slate-900 cursor-pointer")
            }
            onClick={() => (filter !== 0 ? setFilter(0) : null)}
          >
            Pending
          </button>
          <button
            className={
              "border-r border-r-slate-700 px-2 " +
              (filter === 1
                ? "text-slate-900 font-semibold"
                : "hover:text-slate-900 cursor-pointer")
            }
            onClick={() => (filter !== 1 ? setFilter(1) : null)}
          >
            Complete
          </button>
          <button
            className={
              "px-2 " +
              (filter === 2
                ? "text-slate-900 font-semibold"
                : "hover:text-slate-900 cursor-pointer")
            }
            onClick={() => (filter !== 2 ? setFilter(2) : null)}
          >
            All
          </button>
        </div>
        {!addNewOpen ? (
          <button
            onClick={() => setAddNewOpen(true)}
            className="flex items-center font-semibold cursor-pointer text-sky-800 hover:text-sky-600"
          >
            <IconPlusCircleOutline /> Add New
          </button>
        ) : (
          <div className="flex justify-around">
            <button
              className="flex items-center font-semibold cursor-pointer text-sky-800 hover:text-sky-600 border-r border-r-slate-700 px-2"
              type="submit"
              form="new-item"
            >
              <IconContentSave /> Submit
            </button>
            <button
              className="flex items-center font-semibold cursor-pointer text-slate-600 hover:text-slate-500 px-2"
              onClick={() => setAddNewOpen(false)}
            >
              <IconArrowURightTopBold /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddItemAndFilterBar;
