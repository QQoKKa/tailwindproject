import {IoMdCheckmark} from "react-icons/io";


const MainPanel = () => {
    const tasks_done = 10;
    const tasks_working = 5;
    const salary = 3520;
    let last_month = 1000;
    let this_month = 3000;
    const best_employee = "Jan Kowalski";
    const best_employee_salary = 3000;
    const best_employee_tasks = 10;
    const tasks = [ {id: 1, name: "Zadanie 1", description: "Opis zadania 1", status: "working", employee: "Jan Kowalski", deadline: "2021-10-10", priority: "high"} ];
    function calculateProfit() {
        return this_month - last_month;
    }
    function calculateProfitPercent() {
        return (calculateProfit() / last_month) * 100; 
    }

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
                Imię i nazwisko: {best_employee} <br></br>
                Pensja: {best_employee_salary}zł <br></br>
                Zadania wykonane: {best_employee_tasks}
                </div>
                <div className="gridpanel flex flex-col"> Aktualne zadanie dla ciebie <br></br>
      {tasks.map((item) => (
       <p className=" "> <p>{item.name}</p> <p> {item.description}</p>  Deadline: {item.deadline} <p> priority: {item.priority}</p>  </p>
      ))}
                <button  class=" text-white bg-green-600 hover:bg-green-700 shadow-lg
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
                    place-self-end transition duration-150 active:bg-green-200 hover:scale-105">
                    <IoMdCheckmark className="inline-block mr-2 " color="white" size="20" /> Zakończ
                </button>

                </div>
                    <div className="gridpanel"> Twoje wyniki <br></br>
                    <div className="flex flex-row justify-center space-x-5 ">
                    <div className="text-center">Wykonane zadania
                        <p>{tasks_done}</p>
                    </div>
                    <div className="text-center">Trwające zadania
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
    function klikanim() {
        document.getElementById("clickanim").translate(100, 100);
    };

export default MainPanel;