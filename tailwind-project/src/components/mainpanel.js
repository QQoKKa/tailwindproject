import {IoMdCheckmark} from "react-icons/io";
import { useEffect, useState } from "react";
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';


const MainPanel = () => {
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
                <div className="gridpanel flex"> Zyski firmy
                <div><br></br> ten miesiąc {this_month}zł</div>
                <div><br></br> poprzedni miesiąc {last_month}zł</div>
                <div><br></br> Zysk {calculateProfit()}zł</div>
                    <div className="bg-red-500 w-[200px] h-[200px] flex justify-center items-center place-self-center ml-28  ">
                        <div className="bg-blue-500 w-[150px] h-[150px]
                                          rounded-full flex items-center justify-center
                                        text-white font-bold text-3xl 
                                        border-green-700 border-4">{calculateProfitPercent()}%</div>
                    </div>
                </div>
                <div className="gridpanel"> Najlepszy pracownik 
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
                    <div className="text-center mb-2">Nazwa zadania:
                      <p>{tasksData.reduce((maxPriorityTask, currentTask) => {
                          return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).name}</p>
                    </div>
                    <div className="text-center mb-2" >Opis zadania:
                      <p>{tasksData.reduce((maxPriorityTask, currentTask) => {
                          return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).description}</p>
                    </div>
                    <div className="text-center mb-2">Termin wykonania:
                      <p>{new Date(tasksData.reduce((maxPriorityTask, currentTask) => {
                          return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).deadline * 1000).toLocaleString()}</p>
                    </div>
                    <div className="text-center mb-2">Priorytet:
                    <p>{renderPriority(tasksData.reduce((maxPriorityTask, currentTask) => {
                          return currentTask.priority > maxPriorityTask.priority ? currentTask : maxPriorityTask;
                      }).priority)}</p>
                    </div>
                  </div>
              )}
                
                <button  class=" group relative mt-16 text-white bg-green-600 hover:bg-green-700 shadow-lg
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
                    place-self-end transition duration-150 active:bg-green-200 hover:scale-105">
                    <IoMdCheckmark className="inline-block mr-2 " color="white" size="20" /> Zakończ
                    <span className='tooltip-btn group-hover:scale-100'>Zakończ zadanie</span>
                </button>

                </div>
                    <div className="gridpanel"> Twoje wyniki <br></br>
                    <div className="flex flex-row justify-center space-x-5 ">
                    <div className="text-center">Wykonane zadania
                        <p>{tasks_done}</p>
                    </div>
                    <div className="text-center">Trwające zadania w firmie
                        <p>{tasks_working}</p>
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