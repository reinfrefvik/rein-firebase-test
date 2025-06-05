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
        <div className="flex flex-col justify-start p-4 bg-white hover:bg-green-50 rounded-md drop-shadow-md cursor-pointer mt-2 bg-linear-to-t from-white to-100%" onClick={getItem}>
          <div className="font-semibold">{title}</div>
          <div className="text-gray-500 text-sm">
            {type}
            {attunement ? " Requires Attunement" : ""}
          </div>
            <div className="text-sm mt-3 max-h-[100px] overflow-y-hidden text-ellipsis break-normal">{description}</div>
            <div className="h-[20px] mt-[-20px] bg-linear-to-t from-white to-100% z-10"></div>
        </div>
  );
};

export { MagicItem };
