import {MdTaskAlt} from 'react-icons/md';
import {useEffect, useState } from 'react';
import {TbTextPlus} from 'react-icons/tb';
import {ImCross} from 'react-icons/im';
import {IoMdCheckmark} from 'react-icons/io';
import {SlNote} from 'react-icons/sl';
import {IoIosCheckmarkCircle} from 'react-icons/io';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc} from '../dbemp';

const Tasks = () => {
    const [empData, setEmpData] = useState([]);
    const [tasksData, setTasksData] = useState([]);
    const [panelHidden, setPanelHidden] = useState(true);
    const [editpanelHidden, seteditPanelHidden] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);

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

function movepanel() {
  const panel = document.querySelector(".navbar");
  panel.classList.toggle("hidden");
  setPanelHidden(!panelHidden);
}

const handleEditClick = (task) => {
  const editpanel = document.querySelector(".navbaredit");
  editpanel.classList.toggle("hidden");
  setSelectedTask(task);
  seteditPanelHidden(!editpanelHidden);
}

useEffect(() => {
  const add_task = document.querySelector('.add_task');
  const handleSubmit = (e) => {
      e.preventDefault();
      const tasksRef = collection(db, "tasks");
      const tasksDocRef = doc(tasksRef);
      setDoc(tasksDocRef, {
          name: add_task.name.value,
          description: add_task.description.value,
          emp_id: add_task.emp_id.value,
          priority: add_task.priority.value,
          deadline: add_task.deadline.value,
          team: add_task.team.value,
          status: 0,
          
        }).then(() => {
          console.log('Document successfully written!');
          window.location.reload();
        });
      };
      add_task.addEventListener('submit', handleSubmit);
      return () => {
        add_task.removeEventListener('submit', handleSubmit);
      }
    }, [tasksData]);
    
    useEffect(() => {
      const editTask = document.querySelector('.edit_tasks');
      const handleSubmit = (e) => {
          e.preventDefault();
          let taskID = selectedTask.id;
          const taskRef = collection(db, "tasks");
          const taskDocRef = doc(taskRef, taskID);
          console.log(taskID)
          updateDoc(taskDocRef, {
              name: editTask.name.value,
              description: editTask.description.value,
              emp_id: editTask.emp_id.value,
              priority: editTask.priority.value,
              deadline:  editTask.deadline.value,
              team: editTask.team.value,
           
            }).then(() => {
              console.log('Document successfully written!');
              // window.location.reload();
            });
          };
          editTask.addEventListener('submit', handleSubmit);
          return () => {
            editTask.removeEventListener('submit', handleSubmit);
          }
        }, [selectedTask]);

    


    return (       
      <>
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className='border-b-4 border-btnpurple grid'>
        <MdTaskAlt className='' size={100} color='#ECC1FF' />
        <div className='grid grid-flow-col'>
        <button onClick={movepanel} className='relative group ml-8 justify-self-start place-self-start bg-btnpurple hover:bg-btnpurplehover py-2 px-2 rounded-lg over:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-btnpurpleclick active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'><TbTextPlus size={"32px"} color='white'></TbTextPlus>
                                    <span className='tooltip-btn group-hover:scale-100'>Dodaj zadanie</span>
                                   </button>
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
                    <th className=''>Pracownik</th>
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
                        <button onClick={() => handleEditClick(task)} className='  group bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-yellow-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <SlNote size={20}></SlNote>
                        <span className=' tooltip-btn group-hover:scale-100'>Edytuj</span>
                        </button>
                        </td>
                    <td className=' m-2'>
                        {task.status === 0 ? (
                        <button className='group bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-red-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <IoIosCheckmarkCircle size={20}></IoIosCheckmarkCircle>
                        <span className=' tooltip-btn group-hover:scale-100'>Zakończ</span>
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
        </div>
        {/*  */}
        <nav className={`navbar absolute top-0 right-0 bg-sidebarblue w-96 h-full shadow-xl rounded-l-2xl ${
          panelHidden ? "hidden" : "translatex-12"
        } transition duration-150 ease-in-out`}>
          <div className='grid grid-flow-col' >
          <ImCross onClick={movepanel} className=' ml-2 mt-2 justify-self-start text-white hover:cursor-pointer hover:text-red-500'></ImCross>
          </div>
          <form className="add_task">
            <div className='mt-24 grid grid-flow-row'>
              <p className='text-white text-2xl justify-self-center'>Dodaj Zadanie:</p>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Nazwa:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='name' defaultValue={"ZadanieX"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Opis:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='description' defaultValue={"Opis ZadaniaX"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Team:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='team' defaultValue={"Web"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Pracownik:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='emp_id' defaultValue={"worker1"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Ważność:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='number' name='priority' defaultValue={"0"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>deadline:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='date' name='deadline' defaultValue={"XX:XX XX-XX-XXXX"} ></input>
          </div>
          <button type='submit'  class=" justify-self-center relative mt-16 text-white bg-green-600 hover:bg-green-700 shadow-lg
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
                    place-self-end transition duration-150 active:bg-green-200 hover:scale-105">
                    <IoMdCheckmark className="inline-block mr-2 " color="white" size="20" /> Dodaj Zadanie
                </button>
          <div>
          </div>
          </div>
          </form>
        </nav>
        <nav className={`navbaredit absolute top-0 right-0 bg-sidebarblue w-96 h-full shadow-xl rounded-l-2xl ${
          editpanelHidden ? "hidden" : "translatex-12"
        } transition duration-150 ease-in-out`}>
          <div className='grid grid-flow-col' >
          <ImCross onClick={() => seteditPanelHidden(true)} className=' ml-2 mt-2 justify-self-start text-white hover:cursor-pointer hover:text-red-500'></ImCross>
          </div>
          <form className="edit_tasks">
            <div className='mt-24 grid grid-flow-row'>
              <p className='text-white text-2xl justify-self-center'> Edytuj zadanie :</p>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Nazwa:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='name' defaultValue={selectedTask ? selectedTask.name : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Opis:</label>
          <input className='break-words mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='description' defaultValue={selectedTask ? selectedTask.description : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Team:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='team' defaultValue={selectedTask ? selectedTask.team : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Pracownik:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' name='emp_id' defaultValue={selectedTask ? selectedTask.emp_id : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Ważność:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='number' name='priority' defaultValue={selectedTask ? selectedTask.priority : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Deadline:</label>
          <input className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='date' name='deadline' defaultValue={selectedTask ? selectedTask.deadline : ""} ></input>
          </div>
          <button   class=" justify-self-center relative mt-16 text-white bg-green-600 hover:bg-green-700 shadow-lg
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
                    place-self-end transition duration-150 active:bg-green-200 hover:scale-105">
                    <IoMdCheckmark className="inline-block mr-2 " color="white" size="20" /> Zapisz zmiany
                </button>
          <div>
          </div>
          </div>
          </form>
        </nav>  
</> 
);};
export default Tasks;