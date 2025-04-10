const getMockMagicItem = (requiresAttunement = true): MagicItemType => ({
  id: "0",
  mi_title: "Item of Mocking",
  mi_type: "Rare 800g",
  mi_attunement: requiresAttunement,
  mi_description:
    "A Rare item of mocking that lets you mock your items at will.",
});

const getMockMagicItemsList = (LongList = true): MagicItemType[] => {
  const mocks = [
    {
      id: "0",
      mi_title: "Staff of Mocking",
      mi_type: "Rare 800g",
      mi_attunement: true,
      mi_description:
        "A Rare item of mocking that lets you mock your items at will.",
    },
    {
      id: "1",
      mi_title: "Hood of Mocking",
      mi_type: "Uncommon 200g",
      mi_attunement: false,
      mi_description:
        "A Rare Hood of mocking that lets you mock your items at will.",
    },
    {
      id: "2",
      mi_title: "Boots of Mocking",
      mi_type: "Very Rare 2800g",
      mi_attunement: true,
      mi_description:
        "A Rare Boots of mocking that lets you mock your items at will.",
    },
  ];

  if (LongList) {
    return mocks.concat({
      id: "3",
      mi_title: "Ring of Mocking",
      mi_type: "Legendary 10000g",
      mi_attunement: true,
      mi_description:
        "A Rare Ring of mocking that lets you mock your items at will.",
    });
  } else {
    return mocks;
  }
};

export { getMockMagicItem };
