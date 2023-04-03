import {IoMdCheckmark} from "react-icons/io";
import {useEffect, useState } from "react";
import {ImCross} from 'react-icons/im';
import {GoTasklist} from "react-icons/go";
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';


const MainPanel = () => {
    const [empData, setEmpData] = useState(null);
    const [tasksData, setTasksData] = useState([]);
    const [showTaskList, setShowTaskList] = useState(false);



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


let totaltasks =  0;
if(empData){
  totaltasks = empData.length;
}

// sets date

const timestamp = 1618675200; // Unix timestamp in seconds
const date = new Date(timestamp * 1000); // Convert to milliseconds and create Date object
const formattedDate = date.toLocaleString(); // Convert to local time and format as string


//create table task that gets taskData where tasksData.emp_id = empData.login = worker1

      const best_employee = empData ? empData.reduce((acc, cur) => {
        if (cur.tasks_done > acc.tasks_done) {
          return cur;
        } else {
          return acc;
        }
      }, empData[0]) : null;

    
    const tasks_done = empData && empData[0] ? empData[0].tasks_done : 0;
    const tasks_working = 5;
    const salary = empData && empData[0] ? empData[0].salary : 0;
    let last_month = 1000;
    let this_month = 3000;
    // const tasks = [ {id: 1, name: "Zadanie 1", description: "Opis zadania 1", status: "working", employee: "Jan Kowalski", deadline: "2021-10-10", priority: "high"} ];
    function calculateProfit() {
        return this_month - last_month;
    }
    function calculateProfitPercent() {
        return (calculateProfit() / last_month) * 100; 
    }

    
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


const getTaskWorker = (task) => {
  const assignedEmp = empData.find((emp) => emp.login === task.emp_id);
  return assignedEmp ? assignedEmp.name + " " + assignedEmp.surname : "Nie przypisano pracownika";
};


const renderStatus = (status) => {
  if (status === 0) {
    return "working⌛";
  } else {
    return "done✔";
  }
};

const handleCloseTaskList = () => {
  setShowTaskList(false);
};

const handleOpenTaskList = () => {
  setShowTaskList(true);
};




    return (
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center"> 
        {showTaskList && (
          <div className="justify-center items-center grid bg-[rgba(0,0,0,0.4)] w-full right-0 h-full absolute z-0">
            <div className="grid grid-flow-row z-1 h-[600px] w-[1100px] bg-white mr-10 rounded-2xl">
              <div className="border-b-2 border-taskcolor h-fit">
                <ImCross
                  className="float-left ml-4 mt-4 text-2xl cursor-pointer text-taskcolor hover:text-taskcolorhover"
                  size="30"
                  onClick={handleCloseTaskList}
                />
                <p className="text-5xl float-right mb-4 mr-4 mt-4">
                  Twoje zadania
                </p>
              </div>
              <div className='overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-track-none  scrollbar-thumb-taskcolor scrollbar-thumb-rounded-md hover:scrollbar-thumb-taskcolorhover'>
        <table className='table-auto mx-auto mt-0'>
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
            <tbody className='doneTask'>
            {tasksData && tasksData
              .filter(task => task.emp_id === 'worker1')
              .map((task) => (
                <tr key={task.id}>
                  <td className='border-2 px-4 py-2'>{task.name}</td>
                  <td className='border-2 px-4 py-2'>{task.description}</td>
                  <td className='border-2 px-4 py-2'>{getTaskWorker(task)}</td>
                  <td className='border-2 px-4 py-2'>{renderPriority(task.priority)}</td>
                  <td className='border-2 px-4 py-2'>{(task.deadline).toLocaleString()}</td>
                  <td className='border-2 px-4 py-2'>{renderStatus(task.status)}</td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
            </div>
          </div>
        )} 

            <div className=" h-[600px] w-[1100px] ml-32 grid grid-cols-2 grid-rows-2  gap-4">
                <div className=" text-center grind gridpanel"> <p> Witaj {empData && empData[0] ? empData[0].name : "brak danych"}</p> <br></br>
                {!showTaskList && (
                <button onClick={handleOpenTaskList}  class=" mt-16 text-white bg-green-600 hover:bg-green-700 shadow-lg 
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 
                    place-self-end transition duration-150 active:bg-green-200 hover:scale-105"> 
                    <GoTasklist  className="inline-block mr-2 " color="white" size="20" /> Sprawdź zadania
                    </button>
                )}
                </div>
                <div className="gridpanel"> <p className=" mb-9"> Najlepszy pracownik</p>  
                <br></br>
                {best_employee? (
                    <>
                <p>Imię i nazwisko: {best_employee.name+" "+best_employee.surname} <br></br></p>
                <p>Pensja: {best_employee.salary}zł<br></br></p>
                <p>Zadania wykonane: {best_employee.tasks_done}</p>
                </>
                ): (
                    <p>Nie ma najlepszych pracowników</p>
                )}
                </div>
                <div className="gridpanel flex flex-col"> <p className="mb-8" > Aktualne zadanie dla ciebie</p> <br></br>
                {tasksData && tasksData.length > 0 && (
                  <div className="flex flex-row justify-center space-x-5 ">
                    <div className=" text-center mb-2"><p className="border-b-2 border-infored"> Nazwa zadania:</p>
                      <p>{tasksData.reduce((maxPriorityTask, currentTask) => {
                           if (currentTask.status === 1) return maxPriorityTask; 
                           return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).name}</p>
                    </div>
                    <div className="text-center mb-2" ><p className="border-b-2 border-infored"> Opis <br></br> zadania:</p>
                      <p>{tasksData.reduce((maxPriorityTask, currentTask) => {
                           if (currentTask.status === 1) return maxPriorityTask; 
                           return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).description}</p>
                    </div>
                    <div className="text-center mb-2"> <p className="border-b-2 border-infored">Termin wykonania:</p>
                      <p>{(tasksData.reduce((maxPriorityTask, currentTask) => {
                           if (currentTask.status === 1) return maxPriorityTask;
                           return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).deadline)}</p>
                    </div>
                    <div className="text-center mb-2"> <p className="border-b-2 border-infored">Priorytet zadania:</p>
                    <p>{renderPriority(tasksData.reduce((maxPriorityTask, currentTask) => {
                           if (currentTask.status === 1) return maxPriorityTask;
                           return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).priority)}</p>
                    </div>
                  </div>
              )}
                </div>
                    <div className="gridpanel"> <p className="mb-9">Twoje wyniki</p> <br></br>
                    <div className="flex flex-row justify-center space-x-5 ">
                    <div className="text-center">Wykonane zadania
                        <p>{tasks_done}</p>
                    </div>
                    <div className="text-center">Trwające zadania w firmie
                        <p>{totaltasks}</p>
                    </div>
                    <div className="text-center">aktualna wypłata
                        <p>{salary}zł</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
    };
    
export default MainPanel;