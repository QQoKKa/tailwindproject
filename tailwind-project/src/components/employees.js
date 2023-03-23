import {BsFillPersonFill} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../firebase';

const Employees = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getDocsFromCollection() {
          const docRef = collection(db, "emp");
          const docSnap = await getDocs(docRef);
          const data = [];
          docSnap.forEach((doc) => {
            data.push(doc.data());
          });
          setUserData(data);
        }
    
        getDocsFromCollection().catch((error) => {
          // Handle any errors that occur
          console.error(error);
        });
      }, []);

      //calculate total workers
        let totalWorkers = 0;
        if(userData){
            totalWorkers = userData.length;
        }

    return (       
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className=' border-b-4 border-blue-500 grid'>
        <BsFillPersonFill className=' self-end' size={120} color='#3B82F6' />
        <p className='justify-self-end place-self-end text-5xl  mr-4 mb-2'>Pracownicy: {totalWorkers}</p>
        </div>
        <div>
            {/* create list of workers using userdata */}
        <table className='table-auto mx-auto'>
            <thead>
                <tr>
                    <th className='px-4 py-2'>Name</th>
                    <th className='px-4 py-2'>Surname</th>
                    <th className='px-4 py-2'>Position</th>
                    <th className='px-4 py-2'>Salary</th>
                    <th className='px-4 py-2'>Tasks Done</th>
                    {/* <th className='px-4 py-2'>Edit</th>
                    <th className='px-4 py-2'>Delete</th> */}
                </tr>
            </thead>
            {userData && userData.map((user) => (
                // <div className='flex flex-row justify-between border-b-'>
                //     <div className='flex flex-row bg-gray-300 w-full border-b-2 border-blue-400 space-x-3 '>
                //         <p className='text-2xl m-2'>{user.name}</p>
                //         <p className='text-2xl m-2'>{user.surname}</p>
                //         <p className='text-2xl m-2'>{user.position}</p>
                //         <p className='text-2xl m-2'>{user.salary}zł</p>
                //         <p className='text-2xl m-2'>{user.tasks_done}</p>
                //         <button className='" mb-1 inline-block rounded bg-yellow-500 px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal
                //                 text-white shadow-[0_4px_9px_-4px_#3b71ca] 
                //                   transition duration-150 ease-in-out hover:bg-sidebarbluehover hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                //                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                //                   active:bg-blue-200 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' 
                //                   type="button">Edytuj
                //         </button>
                //         <Button onClick={() => {}}>Usuń</Button>
                //         </div>
                //     </div>         
            <tbody>
                <tr key={user.id}>
                    <td className='border px-4 py-2'>{user.name}</td>
                    <td className='border px-4 py-2'>{user.surname}</td>
                    <td className='border px-4 py-2'>{user.position}</td>
                    <td className='border px-4 py-2'>{user.salary}zł</td>
                    <td className='border px-4 py-2'>{user.tasks_done}</td>
                    <td className=' m-2'>
                        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-yellow-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        Edit
                        </button>
                    </td>
                    <td className=' m-2'>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-red-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        Delete
                        </button>
                    </td>
                </tr>
            </tbody>
            ))}
        </table>    
        </div>
        </div>
        </div> 
        );};
export default Employees;