import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EditFormHandle, ItemModalEditing } from "./magicItemModalEdit";
import { useFavorites } from "@/hooks/useMagicItemFavourites";
import {
  FaHeartCirclePlus,
  FaHeartCircleXmark,
  FaTrashCan,
  FaPenToSquare,
} from "react-icons/fa6";
import { FaTimesCircle, FaSave } from "react-icons/fa";
import { IconContext } from "react-icons";

interface itemModalProps {
  modalItem: MagicItemType;
  onDelete?;
  onEditSaved?;
  onClose;
}

const ItemModalRead = ({ modalItem }) => {
  return (
    <>
      <div className="text-lg font-semibold">{modalItem.mi_title}</div>
      <div className="text-sm text-gray-500 mb-2">
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
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();

  const handleFavorite = (e) => {
    e.preventDefault();
    addFavorite(props.modalItem.id, props.modalItem.mi_title);
  };

  const handleUnfavorite = (e) => {
    e.preventDefault();
    removeFavorite(props.modalItem.id);
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
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${props.modalItem.mi_title}?`
    );
    if (confirmDelete) {
      setEditing(false);
      props.onDelete(props.modalItem.id);
    }
  };

  const onEditSaved = (obj: MagicItemType) => {
    props.onEditSaved(obj, props.modalItem.id);
    closeModal();
  };

  if (props.modalItem == null) return null;
  if (!domReady) return null;
  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-1000 bg-[#00000080]"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-md p-4 m-4 w-full max-w-[800px]"
        onClick={(e) => e.stopPropagation()}
      >
        <IconContext.Provider value={{ size: "18px" }}>
          {!editing ? (
            <ItemModalRead modalItem={props.modalItem} />
          ) : (
            <ItemModalEditing
              ref={formRef}
              modalItem={props.modalItem}
              onEditSaved={onEditSaved}
            />
          )}
          <div className="flex flex-row justify-end items-center mt-2">
            {editing && (
              <button
                className="p-2 bg-green-400 hover:bg-green-800 text-white ml-1 rounded-sm"
                onClick={handleSave}
              >
                <FaSave />
              </button>
            )}
            <button
              className={`p-2 bg-${
                editing ? "red" : "blue"
              }-400 text-white ml-1 rounded-sm 
              hover:bg-${editing ? "red" : "blue"}-800 `}
              onClick={onEdit}
            >
              {editing ? <FaTimesCircle /> : <FaPenToSquare />}
            </button>
            {isFavorited(props.modalItem.id) ? (
              <button
                className="p-2 bg-blue-400 hover:bg-blue-800 text-white ml-1 rounded-sm"
                onClick={handleUnfavorite}
              >
                <FaHeartCircleXmark />
              </button>
            ) : (
              <button
                className="p-2 bg-blue-400 hover:bg-blue-800 text-white ml-1 rounded-sm"
                onClick={handleFavorite}
              >
                <FaHeartCirclePlus />
              </button>
            )}
            <button
              className="p-2 bg-red-400 hover:bg-red-800 text-white ml-1 rounded-sm"
              onClick={onDelete}
            >
              <FaTrashCan />
            </button>
          </div>
        </IconContext.Provider>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export { ItemModal };
