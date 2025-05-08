interface magicItemProps {
  item: MagicItemType;
  getModalItem?: (item: MagicItemType) => any;
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
        <div className="flex flex-col justify-start p-4 bg-white hover:bg-green-50 rounded-md drop-shadow-md cursor-pointer mt-2" onClick={getItem}>
          <div className="font-semibold">{title}</div>
          <div className="text-gray-500 text-sm">
            {type}
            {attunement ? " Requires Attunement" : ""}
          </div>
          <div className="text-sm mt-3 max-h-[200px] overflow-y-hidden">{description}</div>
        </div>
  );
};

export { MagicItem };
