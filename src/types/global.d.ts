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

declare type GameType = {
  id?: string;
  name: string;
  description?: string;
  members?: GameMemberType[];
};

declare type GameMemberType = {
  uid: string;
  name?: string;
  gameId: string;
  value1?: string;
  value2?: string;
  semantic1?: string;
  semantic2?: string;
};
