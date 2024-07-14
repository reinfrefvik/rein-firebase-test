import { useState } from 'react';
import './MagicItem.css'; // Import your CSS file
import { AddMagicItem } from './addMagicItemForm';

type magicItem = {
    id?: any,
    mi_title: string,
    mi_type: string,
    mi_attunement: boolean,
    mi_description: string,
}

interface magicItemProps {
    item: magicItem,
    getId?: (id:any)=>any,
}

const MagicItem = (props: magicItemProps) => {
    const title = props.item.mi_title;
    const type = props.item.mi_type;
    const attunement = props.item.mi_attunement;
    const description = props.item.mi_description;

    const getId = () => {
        props.getId(props.item.id);
    }
   
    return (
        <div className="mi_card" onClick={getId}>
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
    const getItemId = (id: any) => {
        // props.delMagicItem(id);¨
        console.log(id);
    }
    return (
        <div className='mi_list_card'>
            <AddMagicItem key="add_magic_item_form" addMagicItem={props.addMagicItem}/>
            {props.items.map(item =>
                <MagicItem key={item.id} item = {item} getId={getItemId}/>
            )}
        </div>
    )
}

export { MagicItemList, type magicItem };