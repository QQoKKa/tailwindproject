import {MdTaskAlt} from 'react-icons/md';
import {useEffect, useState } from 'react';
import {TbTextPlus} from 'react-icons/tb';
import {SlNote} from 'react-icons/sl';
import {IoIosCheckmarkCircle} from 'react-icons/io';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';

const Tasks = () => {
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
      tasksData.push({id: doc.id, ...doc.data()});
    });
    setTasksData(tasksData);
  }

  getDataFromCollections().catch((error) => {
    // Handle any errors that occur
    console.error(error);
  });
}, []);

const timestamp = 1618675200; // Unix timestamp in seconds
const date = new Date(timestamp * 1000); // Convert to milliseconds and create Date object
const formattedDate = date.toLocaleString(); // Convert to local time and format as string


const getTaskWorker = (task) => {
  const assignedEmp = empData.find((emp) => emp.login === task.emp_id);
  return assignedEmp ? assignedEmp.name + " " + assignedEmp.surname : "Nie przypisano pracownika";
};


let totaltasks =  0;
if(empData){
  totaltasks = empData.length;
}

const renderStatus = (status) => {
  if (status === 0) {
    return "working";
  } else {
    return "done";
  }
};

const renderPriority = (priority) => {
  switch (priority) {
  case 0:
    return "low";
  case 1:
    return "medium";
  case 2:
    return "high";
  default:
    return "low";
  }
};

    return (       
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className='border-b-4 border-btnpurple grid'>
        <MdTaskAlt className='' size={100} color='#ECC1FF' />
        <div className='grid grid-flow-col'>
        <button className=' ml-8 justify-self-start place-self-start bg-btnpurple hover:bg-btnpurplehover py-2 px-2 rounded-lg over:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-btnpurpleclick active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'><TbTextPlus size={"32px"} color='white'></TbTextPlus></button>
        <p className='justify-self-end place-self-end text-5xl  mr-4 mb-2'> Zadania: {totaltasks}</p>
        </div>
        </div>
        <div>
            {/* create table */}
        <table className='table-auto mx-auto'>
            <thead>
                <tr>
                    <th className=''>Nazwa</th>
                    <th className=''>Opis</th>
                    <th className=''>Team</th>
                    <th className=''>Priority</th>
                    <th className=''>Dead-line</th>
                    <th className=''>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasksData && tasksData.map((task) => (
                    <tr key={task.id}>
                        <td className='border-2 px-4 py-2'>{task.name}</td>
                        <td className='border-2 px-4 py-2'>{task.description}</td>
                        <td className='border-2 px-4 py-2'>{getTaskWorker(task)}</td>
                        <td className='border-2 px-4 py-2'>{renderPriority(task.priority)}</td>
                        <td className='border-2 px-4 py-2'>{new Date(task.deadline * 1000).toLocaleString()}</td>
                        <td className='border-2 px-4 py-2'>{renderStatus(task.status)}</td>
                        <td className=' m-2'>
                        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-yellow-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <SlNote size={20}></SlNote>
                        </button>
                        </td>
                    <td className=' m-2'>
                        {task.status === 0 ? (
                        <button className=' bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-red-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <IoIosCheckmarkCircle size={20}></IoIosCheckmarkCircle>
                        </button>
                 ) : (
                  //button gone
                  <div></div>      
                )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>           

</div> );
};

export default Tasks;