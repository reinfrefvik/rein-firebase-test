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