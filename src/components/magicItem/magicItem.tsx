import { useState } from 'react';
import './MagicItem.css'; // Import your CSS file

type magicItem = {
    mi_title: string,
    mi_type: string,
    mi_attunement: boolean,
    mi_description: string,
}

interface magicItemProps {
    item: magicItem,
}

const MagicItem = (props: magicItemProps) => {
    const title = props.item.mi_title;
    const type = props.item.mi_type;
    const attunement = props.item.mi_attunement;
    const description = props.item.mi_description;

    return (
        <div className="mi_card">
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
}

const MagicItemList = (props:magicItemListProps) => {
    return (
        <div className='mi_list_card'>
            <AddMagicItem key="add_magic_item_form" addMagicItem={props.addMagicItem}/>
            {props.items.map(item =>
                <MagicItem key={item.id} item = {item} />
            )}
        </div>
    )
}

interface addMagicItemInterface {
    addMagicItem: (newItem:magicItem)=>Promise<void>,
}

const AddMagicItem = (props:addMagicItemInterface) => {
    const [itemTitle, setItemTitle] = useState('');
    const [itemType, setItemType] = useState('');
    const [attunement, setAttunement] = useState(false);
    const [itemDescription, setItemDescription] = useState('');

    const addItem = async (e) => {
        e.preventDefault();

        if(itemTitle == '' || itemType == '' || itemDescription == '') {
            return
        }
    
        const newItem:magicItem = {
            mi_title: itemTitle, 
            mi_type:itemType, 
            mi_attunement:attunement, 
            mi_description:itemDescription
        };  
        props.addMagicItem(newItem);

        setItemTitle('');
        setAttunement(false);
        setItemType('');
        setItemDescription('');
    };

    return (
        <div className="add_magic_item_form_card">
            <div className='add-magic-item-form'>
                <form onSubmit={addItem}>
                    <input name="title" placeholder='Title' value={itemTitle} type="text" onChange={(e) => setItemTitle(e.target.value)}/>
                    <input name="type" placeholder='Type' value={itemType} type="text" onChange={(e) => setItemType(e.target.value)}/>
                    <input type="checkbox" checked={attunement} onChange={(e) => setAttunement(e.target.checked)}/>
                    <textarea name="description" placeholder='Description' value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}/>
                    <button type="submit">Add Item</button>
                </form>      
            </div>
        </div>
    )
}

export { AddMagicItem, MagicItemList, type magicItem };