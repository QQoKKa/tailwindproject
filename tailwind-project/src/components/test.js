import React from 'react';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc} from '../dbemp';
import { useEffect } from 'react';

const Test = () => {
    const colRef = collection(db, "emp");
    getDocs(colRef).then((querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((doc) => {
            data.push(doc.data());
        });
        console.log(data);
    });
    useEffect(() => {
    const addEmp = document.querySelector('.addform');
    addEmp.addEventListener('submit', (e) => {
        e.preventDefault();
        const customId = 'worker3'; // Replace with your custom ID
        const empDocRef = doc(colRef, customId);
        setDoc(empDocRef, {
            login: 'worker3',
            name: 'Jan',
            surname: 'Kowalski',
            salary: 3000,
            tasks_done: 0,
            password: '1234',
            team: 'team1',
            position: 'worker'
        });
    });
    }, []);
            


    return (
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <h1 className="text-2xl">Hello World</h1>
        <form className='addform'>
            <button type='submit' className="bg-green-500">klik</button>
        </form>
        </div>
    );
    }

export default Test;