import { useState } from 'react';
import './MagicItemModal.css';
import { createPortal } from "react-dom";

interface itemModalProps {
    modalItem,
    onDelete?,
    onFavourite?,
    onClose
}

const ItemModalRead = ({modalItem}) => {
  return (
    <>
      <div className="mim-title">
            {modalItem.mi_title}
          </div>
          <div className="mim-type">
            {modalItem.mi_type} {modalItem.mi_attunement ? "requires attunement" : ""}
          </div>
          <div className="mim-description">
            {modalItem.mi_description}
          </div>
    </>
  )
};

const ItemModalEditing = ({modalItem}) => {
  const editItem = () => {

  }
  return (
    <>
      <form onSubmit={editItem}>
        <input name="title" value={modalItem.mi_title} type="text"/>
        <input name="type" value={modalItem.mi_type} type="text"/>
        <div className="mim-edit-attunement">
          <div>requires attunement? </div>
          <input name="attunement" type="checkbox"/>
        </div>
        <textarea name="description" value={modalItem.mi_description}/>
        <button type="submit">save</button>
      </form>
    </>
  )
};

const ItemModal = (props: itemModalProps) => {
    const [editing, setEditing] = useState(false);

    if (props.modalItem == null) {
      return null;
    }

    const closeModal = () => {
      setEditing(false);
      props.onClose();
    };

    const onEdit = () => {
      setEditing(oldState => !oldState)
    }
    const onDelete = () => {
      setEditing(false);
      props.onDelete(props.modalItem.id);
    };

    const onFavourite = () => {
      props.onFavourite(props.modalItem.id);
    }

    return createPortal(
      <div className="mim-modal" onClick={closeModal}>
        <div className="mim-container">
          <div className="mim-card" onClick={e => e.stopPropagation()}>
            {
              !editing ?
              <ItemModalRead modalItem={props.modalItem}/>
              :
              <ItemModalEditing modalItem={props.modalItem}/>
            }
            <div className="mim-footer">
              <button className="mim-footer-edit" onClick={onEdit}>{editing ? "cancel" : "edit"}</button>
              <button className="mim-footer-favourite" onClick={onFavourite}>Favourite</button>
              <button className="mim-footer-delete" onClick={onDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      , document.getElementById('modal')
    );
  };

export { ItemModal }