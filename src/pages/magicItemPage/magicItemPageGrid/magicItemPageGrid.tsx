import useWindowDimensions from "@/hooks/getScreenDimensions";

const Columns = ({ children }) => {
  return <div className="fex flex-col p-1 w-[440px] min-h-1 justify-top align-center">{children}</div>;
};

const MagicItemGrid = ({ children }) => {
  const { width } = useWindowDimensions();
  let columnCount = 0;
  let columns = [];

  children = children.flat();

  if (width < 1000) {
    columnCount = 1;
  } else {
    columnCount = Math.floor(width / 432);
  }

  for (let i = 0; i < columnCount; i++) {
    let tempChildren = [];
    for (let j = i; j < children.length; j += columnCount) {
      tempChildren.push(children[j]);
    }

    columns.push({ key: i, childrenItems: tempChildren });
  }

  return (
    <>
      {columns.map((item) => {
        return <Columns key={item.key}>{item.childrenItems}</Columns>;
      })}
    </>
  );
};

export { MagicItemGrid };
