import { forwardRef, useImperativeHandle, useState } from "react";

export type EditFormHandle = {
  submit: (e: React.FormEvent) => void;
};

type EditFormTypes = {
  modalItem: MagicItemType;
  onEditSaved: (obj: MagicItemType) => void;
};

export const ItemModalEditing = forwardRef<EditFormHandle, EditFormTypes>(
  ({ modalItem, onEditSaved }, ref) => {
    const [titleE, setTitleE] = useState(modalItem.mi_title);
    const [typeE, setTypeE] = useState(modalItem.mi_type);
    const [attunementE, setAttunementE] = useState(modalItem.mi_attunement);
    const [descriptionE, setDescriptionE] = useState(modalItem.mi_description);

    const handleSubmit = (e) => {
      e.preventDefault();

      onEditSaved({
        mi_title: titleE,
        mi_type: typeE,
        mi_attunement: attunementE,
        mi_description: descriptionE,
      });
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label className="text-sm">
            Title:
          </label>
          <input
            className="w-full p-2 bg-gray-200 rounded-md mb-4"
            name="title"
            value={titleE}
            type="text"
            onChange={(e) => setTitleE(e.target.value)}
          />
          <label className="text-sm">
            Type:
          </label>
          <input
            className="w-full p-2 bg-gray-200 rounded-md mt-1 mb-4"
            name="type"
            value={typeE}
            type="text"
            onChange={(e) => setTypeE(e.target.value)}
          />
          <div className="flex flex-row items-center justify-start gap-2 mb-4">
            <div className="text-sm">requires attunement? </div>
            <input
              name="attunement"
              type="checkbox"
              checked={attunementE}
              onChange={(e) => setAttunementE(e.target.checked)}
            />
          </div>
          <textarea
            className="w-full p-2 bg-gray-200 rounded-md mt-1"
            rows={5}
            name="description"
            value={descriptionE}
            onChange={(e) => setDescriptionE(e.target.value)}
          />
        </form>
      </>
    );
  }
);
