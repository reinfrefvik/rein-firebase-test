import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from '../Firebase.js';
import { useEffect, useState } from "react";
   
    const AddData = () => {
        const [data, setData] = useState('')

        const addData = async (e) => {
            e.preventDefault();  
           
            try {
                const docRef = await addDoc(collection(db, "test"), {
                  test: data,    
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }

        const fetchPost = async () => {
            await getDocs(collection(db, "test"))
                .then((querySnapshot)=>{               
                    const result = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id:doc.id }));              
                    console.log(result);
                })
        }

        useEffect(() => {
            fetchPost();
        }, []);

        return (
            <div>
                <form onSubmit={addData}>
                    <input type="text" onChange={(e) => setData(e.target.value)} />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }

    export default AddData;