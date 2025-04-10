import { useEffect, useRef, useState } from "react";
import "./MagicItemModal.css";
import { createPortal } from "react-dom";
import { EditFormHandle, ItemModalEditing } from "./magicItemModalEdit";
import { useAuthUser } from "contexts/useAuth";
import {
  addToRelationTable,
  fetchRelationItems,
} from "services/firebaseService";

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

const ItemModal = (props: itemModalProps) => {
  const [domReady, setDomReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const formRef = useRef<EditFormHandle>(null);

  const user = useAuthUser();
  const userId = user?.uid;

  const handleFavourite = (e) => {
    e.preventDefault();
    const result = addToRelationTable(
      "magic_item_favourites",
      userId,
      props.modalItem.id
    );
  };

  useEffect(() => {
    setDomReady(true);
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

  const onFavourite = async (e) => {
    handleFavourite(e);
    // props.onFavourite(props.modalItem.id);
    const favourites = await fetchRelationItems("magic_item_favourites", userId);
    console.log(favourites);
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
            <button
              className={editing ? "mim-footer-delete" : "mim-footer-edit"}
              onClick={onEdit}
            >
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
