import {MdTaskAlt} from 'react-icons/md';
import {useEffect, useState } from 'react';
import {ImCross} from 'react-icons/im';
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
      tasksData.push(doc.data());
    });
    setTasksData(tasksData);
  }

  getDataFromCollections().catch((error) => {
    // Handle any errors that occur
    console.error(error);
  });
}, []);

const deadlineDate = tasksData && tasksData.deadline ? new Date(tasksData.deadline) : null;
const deadlineDateFormatted = deadlineDate ? deadlineDate.toLocaleDateString() : "brak daty";


const getTaskWorker = (task) => {
  const assignedEmp = empData.find((emp) => emp.login === task.emp_id);
  if (assignedEmp) {
    return assignedEmp.name + " " + assignedEmp.surname;
  } else {
    return "Nie przypisano pracownika";
  }
};



const renderStatus = (status) => {
  if (status === 0) {
    return "working";
  } else {
    return "done";
  }
};


let priorityValue = tasksData && tasksData.priority !== undefined ? tasksData.priority : null;
let priority = "";

switch (priorityValue) {
    case 0:
        priority = "low";
        break;
    case 1:
        priority = "medium";
        break;
    case 2:
        priority = "high";
        break;
    default:
        priority = "low";
        break;
}
    
    return (       
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className='border-b-4 border-blue-500 grid'>
        <MdTaskAlt className='' size={100} color='#3B82F6' />
        <p className='justify-self-end place-self-end text-5xl font-bold mr-4 mb-2'>Zadania</p>
        </div>
        <div>
            {/* create table */}
        <table className='table-auto mx-auto'>
            <thead>
                <tr>
                    <th className='border-2'>Nazwa</th>
                    <th className='border-2'>Opis</th>
                    <th className='border-2'>Pracownik</th>
                    <th className='border-2'>Priority</th>
                    <th className='border-2'>Dead-line</th>
                    <th className='border-2'>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasksData && tasksData.map((task) => (
                    <tr key={task.id}>
                        <td className='border-2 px-4 py-2'>{task.name}</td>
                        <td className='border-2 px-4 py-2'>{task.description}</td>
                        <td className='border-2 px-4 py-2'>{getTaskWorker(task)}</td>
                        <td className='border-2 px-4 py-2'>{priority}</td>
                        <td className='border-2 px-4 py-2'>{deadlineDateFormatted}</td>
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