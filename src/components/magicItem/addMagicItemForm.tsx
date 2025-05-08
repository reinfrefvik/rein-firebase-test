import { useState } from "react";

interface addMagicItemInterface {
  addMagicItem: (newItem: MagicItemType) => Promise<boolean | MagicItemType>;
}

const AddMagicItem = (props: addMagicItemInterface) => {
  const [collapse, setCollapse] = useState(true);
  const [itemTitle, setItemTitle] = useState("");
  const [itemType, setItemType] = useState("");
  const [attunement, setAttunement] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItem = async (e) => {
    e.preventDefault();

    if (itemTitle === "" || itemType === "" || itemDescription === "") {
      setError("Please fill in all fields");
      return;
    }

    const newItem: MagicItemType = {
      mi_title: itemTitle,
      mi_type: itemType,
      mi_attunement: attunement,
      mi_description: itemDescription,
    };
    const result = await props.addMagicItem(newItem);

    if (!!result) {
      setItemTitle("");
      setAttunement(false);
      setItemType("");
      setItemDescription("");

      setError(null);
    } else {
      setError("Error adding item");
    }
  };

  const toggleCollapse = () => {
    setCollapse((prevCheck) => !prevCheck);
  };

  return (
      <div className="flex flex-col justify-start p-4 bg-white drop-shadow-md rounded-md my-2">
        <div className="flex flex-row justify-between items-center">
          <div>Add New Item</div>
          <button className="p-1 bg-gray-200 cursor-pointer" type="button" onClick={toggleCollapse}>
            {collapse ? "show" : "hide"}
          </button>
        </div>
        <div className={collapse ? "hidden" : "block"}>
          <div className="flex flex-col justify-between items-center w-full min-w-[200px]">
            <form className="w-full" onSubmit={addItem}>
              <input
                name="title"
                placeholder="Title"
                value={itemTitle}
                type="text"
                onChange={(e) => setItemTitle(e.target.value)}
              />
              <input
                name="type"
                placeholder="Type"
                value={itemType}
                type="text"
                onChange={(e) => setItemType(e.target.value)}
              />
              <div className="flex flex-row w-full justify-between">
                <div className="">Requires Attunement?</div>
                <input
                  className=""
                  type="checkbox"
                  checked={attunement}
                  onChange={(e) => setAttunement(e.target.checked)}
                />
              </div>
              <div className="mt-1 w-full">
                <textarea
                  className="w-full h-[100px] overflow-scroll"
                  name="description"
                  placeholder="Description"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
              <div className="w-full mt-1">
                <button type="submit" className="w-full bg-green-600 text-white cursor-pointer">
                  Add Item
                </button>
              </div>
            </form>
            {error && <div className="w-full bg-red-100 mt-1 text-center">{error}</div>}
          </div>
        </div>
      </div>
  );
};

export { AddMagicItem };
