import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import {db} from '../../Firebase.js';
import React, { useContext, useEffect, useState } from 'react';
import './MagicItemPage.css'; // Import your CSS file for styling
import { AuthContext } from '../../contexts/authContexts';
import { MagicItemList, magicItem } from '../../components/magicItem/magicItems';


const MagicItemPage = () => {
  const {user} = useContext(AuthContext);
  const [itemList, setItemList] = useState(Array<any>);
  const [fullItemList, setFullItemList] = useState(Array<any>);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);


  const deleteMagicItem = async (id: any) => {
    console.log(id);
    try {
      const docRef = await deleteDoc(doc(db, "magic_items", id));
      console.log("Attempting Delete: ", docRef);
      fetchMagicItems();
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
        setFullItemList(result);
        setSearching(false);
    })
  };

  const searchInMagicItems = (e) => {
    e.preventDefault();
    console.log("searching");

    if(searchText == "") {
      return;
    }
    
    const searchResult = [];

    for (let i = 0; i < fullItemList.length; i++) {
      const itemText = fullItemList[i].mi_title.toLowerCase();
      if (itemText.search(searchText.toLowerCase()) != -1) {
        console.log(fullItemList[i].mi_title);
        searchResult.push(fullItemList[i]);
      }
    }

    
    setSearching(true);
    setItemList(searchResult);
  }

  const resetSearch = (e) => {
    setSearching(false);
    setSearchText("");
  
    e.preventDefault();
    if(fullItemList.length > 0 ) {
      setItemList(fullItemList);
    } else {
      fetchMagicItems();
    }
  }

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
        <div className="mil-search-container">
          <div className="mil-search">
            <input name="search_text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            <button onClick={searchInMagicItems}>Search</button>
          </div>
          { searching && 
          <div className="mil-search-info">
            <span>Filtering for: "{searchText}"</span>
            <button onClick={resetSearch}>Reset</button>
          </div>
          }
        </div>
        <MagicItemList items={itemList} addMagicItem={addMagicItem} delMagicItem={deleteMagicItem}/>
    </div>
  );
};

export default MagicItemPage;
