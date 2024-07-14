import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import {db} from '../../Firebase.js';
import React, { useContext, useEffect, useState } from 'react';
import './MagicItemPage.css'; // Import your CSS file for styling
import { AuthContext } from '../../contexts/authContexts';
import { MagicItemList, magicItem } from '../../components/magicItem/magicItems';

const MagicItemPage = () => {
  const {user} = useContext(AuthContext);
  const [itemList, setItemList] = useState(Array<any>);


  const deleteMagicItem = async (id: any) => {
    console.log(id);
    try {
      const docRef = await deleteDoc(doc(db, "magic_items", id));
      console.log("Attempting Delete: ", docRef);
    } catch (e) {
      console.log("Error Deleting: ", e);
    }
  }
  
  const addMagicItem = async (item: magicItem) => {
    console.log(item.mi_title);

    try {
      const docRef = await addDoc(collection(db, "magic_items"), {
        mi_title: item.mi_title,
        mi_type: item.mi_type,
        mi_attunement: item.mi_attunement,
        mi_description: item.mi_description,
      });
      console.log("Document written with ID: ", docRef.id);
      fetchMagicItems();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  const fetchMagicItems = async () => {
    if(!user) {
      return
    }

    await getDocs(collection(db, "magic_items"))
    .then((querySnapshot)=>{               
        const result = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));              
        
        console.log(result);
        setItemList(result);
    })
  };

  useEffect(() => {
    fetchMagicItems();
  }, []);

  if(!user) {
    return (
        <div>
            <span>Fetching User</span>
        </div>
    )
  }

  return (
    <div className='profile-body'>
        <MagicItemList items={itemList} addMagicItem={addMagicItem} delMagicItem={deleteMagicItem}/>
    </div>
  );
};

export default MagicItemPage;
