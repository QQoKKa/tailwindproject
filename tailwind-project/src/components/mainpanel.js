import {IoMdCheckmark} from "react-icons/io";
import {useEffect, useState } from "react";
import {IoHappy} from "react-icons/io5";
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';


const MainPanel = () => {
    const [empData, setEmpData] = useState(null);
    const [tasksData, setTasksData] = useState([]);


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


    return (
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center"> 
            <div className=" h-[600px] w-[1100px] ml-32 grid grid-cols-2 grid-rows-2  gap-4">
                <div className=" text-center grind gridpanel"> <p> Witaj {empData && empData[0] ? empData[0].name : "brak danych"}</p> <br></br>
                <div className="flex flex-col justify-center items-center">
                  </div>
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
                <div className="gridpanel flex flex-col"> Aktualne zadanie dla ciebie <br></br>
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
                    <div className="gridpanel"> Twoje wyniki <br></br>
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