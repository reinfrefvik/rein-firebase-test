import "./MagicItem.css"; // Import your CSS file
import { type magicItem } from "../../pages/magicItemPage/magicItemPage";

interface magicItemProps {
  item: magicItem;
  getModalItem?: (item: magicItem) => any;
}

const MagicItem = (props: magicItemProps) => {
  const title = props.item.mi_title;
  const type = props.item.mi_type;
  const attunement = props.item.mi_attunement;
  const description = props.item.mi_description;

  const getItem = () => {
    props.getModalItem(props.item);
  };

  return (
    <div className="mi-card-container">
      <div className="mi-card-cursor">
        <div className="mi-card" onClick={getItem}>
          <div className="mi-title">{title}</div>
          <div className="mi-type">
            {type}
            {attunement ? " Requires Attunement" : ""}
          </div>
          <div className="mi-body">{description}</div>
        </div>
      </div>
    </div>
  );
};

export { MagicItem };
