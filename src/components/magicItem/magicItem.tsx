import { useState } from 'react';
import './MagicItem.css'; // Import your CSS file

const AddMagicItem = () => {
    const [itemTitle, setItemTitle] = useState('');
    const [itemType, setItemType] = useState('');
    const [attunement, setAttunement] = useState(false);
    const [itemDescription, setItemDescription] = useState('');

    const addItem = async (e) => {
        e.preventDefault();
        console.log(itemTitle);
    }

    return (
        <div>
            <form onSubmit={addItem}>
                <div className='add-magic-item-form'>
                    <input name="title" placeholder='Title' type="text" onChange={(e) => setItemTitle(e.target.value)}/>
                    <input name="type" placeholder='Type' type="text" onChange={(e) => setItemType(e.target.value)}/>
                    <input type="checkbox" checked={attunement} onChange={(e) => setAttunement(e.target.checked)}/>
                    <textarea name="description" placeholder='Description' onChange={(e) => setItemDescription(e.target.value)}/>
                    <button type="submit">Add Item</button>
                </div>
            </form>
        </div>
    )
}

export default AddMagicItem;