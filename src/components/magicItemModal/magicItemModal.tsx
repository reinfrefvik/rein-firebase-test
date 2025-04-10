import { forwardRef, use, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./MagicItemModal.css";
import { createPortal } from "react-dom";

interface itemModalProps {
  modalItem: MagicItemType;
  onDelete?;
  onFavourite?;
  onEditSaved?;
  onClose;
}

const ItemModalRead = ({ modalItem }) => {
  return (
    <>
      <div className="mim-title">{modalItem.mi_title}</div>
      <div className="mim-type">
        {modalItem.mi_type}{" "}
        {modalItem.mi_attunement ? "requires attunement" : ""}
      </div>
      <div className="mim-description">{modalItem.mi_description}</div>
    </>
  );
};

type EditFormHandle = {
  submit: (e: React.FormEvent) => void;
};

type EditFormTypes = {
  modalItem: MagicItemType;
  onEditSaved: (obj: MagicItemType) => void;
};

const ItemModalEditing = forwardRef<EditFormHandle, EditFormTypes>(
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

const ItemModal = (props: itemModalProps) => {
  const [domReady, setDomReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const formRef = useRef<EditFormHandle>(null);
  
  useEffect(() => {
    setDomReady(true)
  }, []);
  const handleSave = (e) => {
    e.preventDefault();
    formRef.current?.submit(e);
  };

  const closeModal = () => {
    setEditing(false);
    props.onClose();
  };

  const onEdit = () => {
    setEditing((oldState) => !oldState);
  };

  const onDelete = () => {
    setEditing(false);
    props.onDelete(props.modalItem.id);
  };

  const onFavourite = () => {
    props.onFavourite(props.modalItem.id);
  };

  const onEditSaved = (obj: MagicItemType) => {
    props.onEditSaved(obj, props.modalItem.id);
    closeModal();
  };

 
  if (props.modalItem == null) return null;
  if (!domReady) return null;
  return createPortal(
    <div className="mim-modal" onClick={closeModal}>
      <div className="mim-container">
        <div className="mim-card" onClick={(e) => e.stopPropagation()}>
          {!editing ? (
            <ItemModalRead modalItem={props.modalItem} />
          ) : (
            <ItemModalEditing
              ref={formRef}
              modalItem={props.modalItem}
              onEditSaved={onEditSaved}
            />
          )}
          <div className="mim-footer">
            {editing && (
              <button className="mim-footer-edit" onClick={handleSave}>
                Save
              </button>
            )}
            <button className={editing ? "mim-footer-delete" : "mim-footer-edit"} onClick={onEdit}>
              {editing ? "cancel" : "edit"}
            </button>
            <button className="mim-footer-favourite" onClick={onFavourite}>
              Favourite
            </button>
            <button className="mim-footer-delete" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export { ItemModal };
