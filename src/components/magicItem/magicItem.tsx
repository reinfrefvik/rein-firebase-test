import { useEffect, useRef, useState } from "react";

interface magicItemProps {
  item: MagicItemType;
  getModalItem?: (item: MagicItemType) => any;
}

const MagicItem = (props: magicItemProps) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    useState(false);

  const title = props.item.mi_title;
  const type = props.item.mi_type;
  const attunement = props.item.mi_attunement;
  const description = props.item.mi_description;

  const getItem = () => {
    props.getModalItem(props.item);
  };

  useEffect(() => {
    if (!descriptionRef.current) return;
    const observer = new ResizeObserver((entries) => {
      console.log(entries[0].contentRect.height);
      if (entries[0].contentRect.height < 100) {
        console.log("Description is not overflowing");
        setIsDescriptionOverflowing(false);
      } else {
        console.log("Description is overflowing");
        setIsDescriptionOverflowing(true);
      }
    });
    observer.observe(descriptionRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="flex flex-col justify-start p-4 bg-white hover:bg-green-50 rounded-md drop-shadow-md cursor-pointer mt-2 bg-linear-to-t from-white to-100%"
      onClick={getItem}
    >
      <div className="font-semibold">{title}</div>
      <div className="text-gray-500 text-sm">
        {type}
        {attunement ? " Requires Attunement" : ""}
      </div>
      <div
        className="text-sm mt-3 max-h-[100px] overflow-y-hidden text-ellipsis break-normal"
        ref={descriptionRef}
      >
        {description}
      </div>
      <div
        className={`h-[20px] mt-[-20px] bg-linear-to-t from-white to-100% z-10 ${
          isDescriptionOverflowing ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export { MagicItem };
