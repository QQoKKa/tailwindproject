import {BsFillPersonFill, BsPersonPlusFill} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {ImCross} from 'react-icons/im';
import {IoMdCheckmark} from 'react-icons/io';
import {SlNote} from 'react-icons/sl';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc} from '../dbemp';

const Employees = () => {
    const [empID, setEmpID] = useState([]);
    const [empData, setEmpData] = useState([]);
    const [tasksData, setTasksData] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [panelHidden, setPanelHidden] = useState(true);
    const [editpanelHidden, seteditPanelHidden] = useState(true);
useEffect(() => {
  async function getDataFromCollections() {
    const empRef = collection(db, "emp");
    const tasksRef = collection(db, "tasks");


    const [empSnap, tasksSnap] = await Promise.all([
      getDocs(empRef),
      getDocs(tasksRef),
    ]);

    const empID = [];
    empSnap.forEach((doc) => {
      empID.push(doc.id);
    });
    setEmpID(empID);

    const empData = [];
    empSnap.forEach((doc) => {
      empData.push(doc.data());
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

      // async function deleteEmp(empIdToDelete) {
      //   try {
      //     await deleteDoc(doc(db, "emp", empIdToDelete));
      //     const updatedEmpData = empData.filter((emp) => emp.id !== empIdToDelete);
      //     setEmpData(updatedEmpData);

      //     const updatedEmpIds = empID.filter((id) => id !== empIdToDelete);
      //     setEmpID(updatedEmpIds);

      //     console.log(`Worker with ID ${empIdToDelete} deleted successfully`);
      //   }  catch (error) {
      //   console.error(`Error deleting worker with ID ${empIdToDelete}: ${error}`);
      // }
      // }

      function movepanel() {
        const panel = document.querySelector(".navbar");
        panel.classList.toggle("hidden");
        setPanelHidden(!panelHidden);
      }

      const handleEditClick = (user) => {
        const editpanel = document.querySelector(".navbaredit");
        editpanel.classList.toggle("hidden");
        setSelectedEmployee(user);
        seteditPanelHidden(!editpanelHidden);
      }
      //add
      useEffect(() => {
        const addEmp = document.querySelector('.addemp-form');
        const handleSubmit = (e) => {
            e.preventDefault();
            let totalWorkers = empData.length;
            const workersID = totalWorkers+1;
            const empRef = collection(db, "emp");
            const customId = 'worker'+workersID; // Replace with your custom ID
            const empDocRef = doc(empRef, customId);
            setDoc(empDocRef, {
                login: customId,
                name: addEmp.name.value,
                surname: addEmp.surname.value,
                salary: addEmp.salary.value,
                tasks_done: 0,
                password: addEmp.password.value,
                team: addEmp.team.value,
                position: addEmp.position.value
              }).then(() => {
                console.log('Document successfully written!');
                 window.location.reload();
              });
            };
            addEmp.addEventListener('submit', handleSubmit);
            return () => {
              addEmp.removeEventListener('submit', handleSubmit);
            }
          }, [empData]);
          
          
          
          
      // delete
      const handleDelete = (login) => {
        deleteEmp(login);
      }

      const deleteEmp = (login) => {
        const docref = doc(db, "emp", login);
        deleteDoc(docref).then(() => {
          console.log("Document successfully deleted!");
          window.location.reload();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      }
      //create edit form that edits the selected employee

      useEffect(() => {
        const editEmp = document.querySelector('.editemp-form');
        const handleSubmit = (e) => {
            e.preventDefault();
            const login = selectedEmployee.login;
            const empRef = collection(db, "emp");
            const empDocRef = doc(empRef, login);
            console.log(login);
            updateDoc(empDocRef, {
                login: login,
                name: editEmp.name.value,
                surname: editEmp.surname.value,
                salary: parseInt(editEmp.salary.value),
                password: editEmp.password.value,
                team: editEmp.team.value,
                position: editEmp.position.value,
              }).then(() => {
                console.log('Document successfully written!');
                // window.location.reload();
              });
            };
            editEmp.addEventListener('submit', handleSubmit);
            return () => {
              editEmp.removeEventListener('submit', handleSubmit);
            }
          }, [selectedEmployee]);

      

    return (       
      <>
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white max-h-[600px] h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className=' border-b-4 border-blue-500 grid'>
        <BsFillPersonFill className=' self-end' size={120} color='#3B82F6' />
        <div className='grid grid-flow-col'>
        <button onClick={movepanel} className='group ml-8 justify-self-start place-self-start bg-blue-500 hover:bg-blue-600 py-2 px-2 rounded-lg over:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'><BsPersonPlusFill size={"32px"} color='white'></BsPersonPlusFill>
                                   <span className='tooltip-btn group-hover:scale-100'>Dodaj pracownika</span> 
                                   </button>
        <p className='justify-self-end place-self-end text-5xl  mr-4 mb-2'> Pracownicy: {totalWorkers}</p>
        </div>
        </div>
        <div className='overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-track-none  scrollbar-thumb-blue-500 scrollbar-thumb-rounded-md hover:scrollbar-thumb-blue-700'>
            {/* create list of workers using empData */}
        <table className=' table-auto mx-auto'>
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
            <tbody>
                <tr key={user.id}>
                    <td className='border px-4 py-2'>{user.name}</td>
                    <td className='border px-4 py-2'>{user.surname}</td>
                    <td className='border px-4 py-2'>{user.position}</td>
                    <td className='border px-4 py-2'>{user.team}</td>
                    <td className='border px-4 py-2'>{user.salary}zł</td>
                    <td className='border px-4 py-2'>{user.tasks_done}</td>
                    <td className=' m-2'>
                        <button  onClick={() => handleEditClick(user)} className='group bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                                   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                                   active:bg-yellow-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'>
                        <SlNote className=''></SlNote>
                        <span className=' tooltip-btn group-hover:scale-100'>Edytuj</span>
                        </button>
                    </td>
                    <td className=' m-2'>
                        <button onClick={() => handleDelete(user.login)} className='del-form group bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
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
        {/*  */}
        {/* create side panel that slides in from right */}
        <nav className={`navbar absolute top-0 right-0 bg-sidebarblue w-96 h-full shadow-xl rounded-l-2xl ${
          panelHidden ? "hidden" : "translatex-12"
        } transition duration-150 ease-in-out`}>
          <div className='grid grid-flow-col' >
          <ImCross onClick={movepanel} className=' ml-2 mt-2 justify-self-start text-white hover:cursor-pointer hover:text-red-500'></ImCross>
          </div>
          <form className='addemp-form'>
            <div className='mt-24 grid grid-flow-row'>
              <p className='text-white text-2xl justify-self-center'>Dodaj pracownika:</p>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Imię:</label>
          <input name="name" className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' defaultValue={"Jan"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Nazwisko:</label>
          <input name="surname" className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' defaultValue={"Kowalski"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Stanowisko:</label>
          <input name="position" className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' defaultValue={"Pracownik"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Team:</label>
          <input name="team" className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' defaultValue={"Web"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Wypłata:</label>
          <input name="salary" className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='number' defaultValue={"3500"} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Hasło:</label>
          <input name="password" className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' type='text' defaultValue={"worker"} ></input>
          </div>
          <button type='submit'  class=" justify-self-center relative mt-16 text-white bg-green-600 hover:bg-green-700 shadow-lg
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
                    place-self-end transition duration-150 active:bg-green-200 hover:scale-105">
                    <IoMdCheckmark className="inline-block mr-2 " color="white" size="20" /> Dodaj pracownika
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
          <form className='editemp-form'>
            <div className='mt-24 grid grid-flow-row'>
              <p className='text-white text-2xl justify-self-center'>edytuj pracownika:</p>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Imię:</label>
          <input 
                 className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' 
                 type='text' name='name' defaultValue={selectedEmployee ? selectedEmployee.name : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Nazwisko:</label>
          <input 
                 className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500'
                 type='text' name='surname' defaultValue={selectedEmployee ? selectedEmployee.surname : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Stanowisko:</label>
          <input 
                 className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' 
                 type='text' name='position' defaultValue={selectedEmployee ? selectedEmployee.position : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Team:</label>
          <input 
                 className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' 
                 type='text' name='team' defaultValue={selectedEmployee ? selectedEmployee.team : ""} ></input>
          </div>
          <div className='grid grid-flow-col'>
          <label className='font-bold text-lg text-white ml-2'>Wypłata:</label>
          <input 
                 className='mr-4 justify-self-end bg-sidebarblue  border-4 border-sidebarblue border-b-infored  rounded-lg ml-2 text-white focus:bg-purple-500' 
                 type='number' name='salary' defaultValue={selectedEmployee ? selectedEmployee.salary : ""} ></input>
          </div>

          <button  type='submit'  class=" justify-self-center relative mt-16 text-white bg-green-600 hover:bg-green-700 shadow-lg
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
export default Employees;