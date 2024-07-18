import { useState } from 'react';
import './MagicItem.css';
import { magicItem } from './magicItems';
import expand_down from '../../assets/expand_circle_down_16.png';
import expand_up from '../../assets/expand_circle_up_16.png';


interface addMagicItemInterface {
    addMagicItem: (newItem:magicItem)=>Promise<void>,
}

const AddMagicItem = (props:addMagicItemInterface) => {
    const [collapse, setCollapse] = useState(false);
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

    const toggleCollapse = () => {
        setCollapse(prevCheck => !prevCheck);
    };

    return (
        <div className="ami-form-container">
        <div className="ami_form_card">
            <div className="ami_header">
                <div>Add New Item</div>
                <button type="button" onClick={toggleCollapse}>{collapse ? "show" : "hide"}</button>
            </div>
            <div className={collapse ? "ami_hide" : "ami_show"}>
                <div className='ami_form'>
                    <form onSubmit={addItem}>
                        <input name="title" placeholder='Title' value={itemTitle} type="text" onChange={(e) => setItemTitle(e.target.value)}/>
                        <input name="type" placeholder='Type' value={itemType} type="text" onChange={(e) => setItemType(e.target.value)}/>
                        <div className="ami_attunement">
                            <div className="ami_attunement_text">Requires Attunement?</div>
                            <input className="ami_attunement_input" type="checkbox" checked={attunement} onChange={(e) => setAttunement(e.target.checked)}/>
                        </div>
                        <div className="ami_description">
                            <textarea className="ami_description_input" name="description" placeholder='Description' value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}/>
                        </div>
                        <div className="ami_submit">
                            <button type="submit" className="ami_submit_button">Add Item</button>
                        </div>
                    </form>      
                </div>
            </div>
        </div>
        </div>
    )
}

export { AddMagicItem }