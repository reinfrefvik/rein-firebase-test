import { forwardRef, useImperativeHandle, useState } from "react";
import "./MagicItemModal.css";
import "./MagicItemModalEdit.css";

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
          <input
            name="title"
            value={titleE}
            type="text"
            onChange={(e) => setTitleE(e.target.value)}
          />
          <input
            name="type"
            value={typeE}
            type="text"
            onChange={(e) => setTypeE(e.target.value)}
          />
          <div className="mim-edit-attunement">
            <div>requires attunement? </div>
            <input
              name="attunement"
              type="checkbox"
              checked={attunementE}
              onChange={(e) => setAttunementE(e.target.checked)}
            />
          </div>
          <textarea
            className="mim-edit-description"
            name="description"
            value={descriptionE}
            onChange={(e) => setDescriptionE(e.target.value)}
          />
        </form>
      </>
    );
  }
);
