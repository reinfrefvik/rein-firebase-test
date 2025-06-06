declare interface Stuffies {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

declare type MagicItemType = {
  id?: any;
  mi_title: string;
  mi_type: string;
  mi_attunement: boolean;
  mi_description: string;
  is_favorite?: boolean;
};

declare type MagicItemFavouriteType = {
  id?: string;
  uid: string;
  displayName: string;
  itemId: string;
  itemName: string;
};

declare type GameType = {
  id?: string;
  name: string;
  description?: string;
  members?: GameMemberType[];
  self?: boolean;
};

declare type GameMemberType = {
  uid: string;
  id?: string;
  gameName?: string;
  displayName?: string;
  gameId: string;
};

declare type GameNoteType = {
  id?: string;
  gameId: string;
  userId: string;
  noteType:
    | "character"
    | "faction"
    | "lore"
    | "location"
    | "item"
    | "quest"
    | "other";
  title: string;
  content: string;
  createdAt?: Date;
};

declare type NoteType = {
  id?: string;
  content: string;
  relationType: string;
  relationId: string;
  createdBy: string;
  createdAt?: Date;
};
