import { useState } from 'react';
import './MagicItemModal.css';
import { createPortal } from "react-dom";

interface itemModalProps {
    modalItem,
    onDelete?,
    onFavourite?,
    onEditSaved?,
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

const ItemModalEditing = ({modalItem, onEditSaved}) => {
  const [titleE, setTitleE] = useState(modalItem.mi_title);
  const [typeE, setTypeE] = useState(modalItem.mi_type);
  const [attunementE, setAttunementE] = useState(modalItem.mi_attunement);
  const [descriptionE, setDescriptionE] = useState(modalItem.mi_description);


  const editItem = (e) => {
    e.preventDefault();
    
    onEditSaved(
      {
        mi_title: titleE,
        mi_type: typeE,
        mi_attunement: attunementE,
        mi_description: descriptionE
      }
    );
  };


  return (
    <>
      <form onSubmit={editItem}>
        <input name="title" value={titleE} type="text" onChange={(e) => setTitleE(e.target.value)}/>
        <input name="type" value={typeE} type="text" onChange={(e) => setTypeE(e.target.value)}/>
        <div className="mim-edit-attunement">
          <div>requires attunement? </div>
          <input name="attunement" type="checkbox" checked={attunementE} onChange={(e) => setAttunementE(e.target.checked)}/>
        </div>
        <textarea name="description" value={descriptionE} onChange={(e) => setDescriptionE(e.target.value)}/>
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
    };
  
    const onDelete = () => {
      setEditing(false);
      props.onDelete(props.modalItem.id);
    };

    const onFavourite = () => {
      props.onFavourite(props.modalItem.id);
    }

    const onEditSaved = (obj: any) => {
      props.onEditSaved(obj, props.modalItem.id);
      closeModal();
    }

    return createPortal(
      <div className="mim-modal" onClick={closeModal}>
        <div className="mim-container">
          <div className="mim-card" onClick={e => e.stopPropagation()}>
            {
              !editing ?
              <ItemModalRead modalItem={props.modalItem}/>
              :
              <ItemModalEditing modalItem={props.modalItem} onEditSaved={onEditSaved}/>
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