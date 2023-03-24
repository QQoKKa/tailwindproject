import {BsFillPersonFill, BsPersonPlusFill} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {ImCross} from 'react-icons/im';
import {SlNote} from 'react-icons/sl';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';

const Employees = () => {
    const [empData, setEmpData] = useState(null);
    const [tasksData, setTasksData] = useState(null);

useEffect(() => {
  async function getDataFromCollections() {
    const empRef = collection(db, "emp");
    const tasksRef = collection(db, "tasks");


    const [empSnap, tasksSnap] = await Promise.all([
      getDocs(empRef),
      getDocs(tasksRef),
    ]);

    const empData = [];
    empSnap.forEach((doc) => {
      empData.push(doc.data());
      console.log();
    });
    setEmpData(empData);

    const tasksData = [];
    tasksSnap.forEach((doc) => {
      tasksData.push(doc.data());
    });
    setTasksData(tasksData);
  }

  getDataFromCollections().catch((error) => {
    // Handle any errors that occur
    console.error(error);
  });
}, []);
      //calculate total workers
        let totalWorkers = 0;
        if(empData){
            totalWorkers = empData.length;
        }

    return (       
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className=' border-b-4 border-blue-500 grid'>
        <BsFillPersonFill className=' self-end' size={120} color='#3B82F6' />
        <div className='grid grid-flow-col'>
        <button className='group ml-8 justify-self-start place-self-start bg-blue-500 hover:bg-blue-600 py-2 px-2 rounded-lg over:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'><BsPersonPlusFill size={"32px"} color='white'></BsPersonPlusFill>
                                   <span className='tooltip-btn group-hover:scale-100'>Dodaj pracownika</span>
                                   </button>
        <p className='justify-self-end place-self-end text-5xl  mr-4 mb-2'> Pracownicy: {totalWorkers}</p>
        </div>
        </div>
        <div>
            {/* create list of workers using empData */}
        <table className='table-auto mx-auto'>
            <thead>
                <tr>
                    <th className='px-4 py-2'>Name</th>
                    <th className='px-4 py-2'>Surname</th>
                    <th className='px-4 py-2'>Position</th>
                    <th className='px-4 py-2'>Team</th>
                    <th className='px-4 py-2'>Salary</th>
                    <th className='px-4 py-2'>Tasks Done</th>
                    {/* <th className='px-4 py-2'>Edit</th>
                    <th className='px-4 py-2'>Delete</th> */}
                </tr>
            </thead>
            {empData && empData.map((user) => (
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
                    <td className='border px-4 py-2'>{user.team}</td>
                    <td className='border px-4 py-2'>{user.salary}zł</td>
                    <td className='border px-4 py-2'>{user.tasks_done}</td>
                    <td className=' m-2'>
                        <button className='group bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-yellow-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <SlNote className=''></SlNote>
                        <span className='tooltip-btn group-hover:scale-100'>Edytuj</span>
                        </button>
                    </td>
                    <td className=' m-2'>
                        <button className='group bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-red-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <ImCross></ImCross>
                        <span className='tooltip-btn group-hover:scale-100'>usuń</span>
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