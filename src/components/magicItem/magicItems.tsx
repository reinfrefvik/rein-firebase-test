import { useState } from 'react';
import './MagicItem.css'; // Import your CSS file
import { AddMagicItem } from './addMagicItemForm';
import { ItemModal } from './magicItemModal';

type magicItem = {
    id?: any,
    mi_title: string,
    mi_type: string,
    mi_attunement: boolean,
    mi_description: string,
}

interface magicItemProps {
    item: magicItem,
    getItem?: (id:any)=>any,
}

const MagicItem = (props: magicItemProps) => {
    const title = props.item.mi_title;
    const type = props.item.mi_type;
    const attunement = props.item.mi_attunement;
    const description = props.item.mi_description;

    const getItem = () => {
        props.getItem(props.item);
    }
   
    return (
        <div className="mi_card" onClick={getItem}>
            <div className="mi_title">
                {title}
            </div>
            <div className="mi_type">
                {type}
                {attunement ? ' Requires Attunement' : ''}
            </div>
            <div className="mi_body">
                {description}
            </div>
        </div>
    );
}

interface magicItemListProps {
    items: Array<any>,
    addMagicItem: (newItem:magicItem)=>Promise<void>,
    delMagicItem?: (itemId:any)=>Promise<void>;
}

const MagicItemList = (props:magicItemListProps) => {
    const [modalItem, setModalItem] = useState(null);

    const getItemId = (item: any) => {
        console.log(item);
        setModalItem(item);
    };

    const onDelete = (id: any) => {
        props.delMagicItem(id);
        setModalItem(null);
    };

    const onFavourite = (id: any) => {
        console.log(id);
    };

    return (
        <div className='mi_list'>
            <ItemModal modalItem={modalItem} onClose={()=>setModalItem(null)} onDelete={onDelete} onFavourite={onFavourite}/>
            <AddMagicItem key="add_magic_item_form" addMagicItem={props.addMagicItem}/>
            {props.items.map(item =>
                <MagicItem key={item.id} item = {item} getItem={getItemId}/>
            )}
        </div>
    )
}

export { MagicItemList, type magicItem };