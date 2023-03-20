const MainPanel = () => {
    let last_month = 1000;
    let this_month = 3000;
    const best_employee = "Jan Kowalski";
    const best_employee_salary = 3000;
    const best_employee_tasks = 10;
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
                    <div className="bg-red-500 w-[200px] h-[200px] flex justify-center items-center place-self-center ml-28 ">
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
                <div className="gridpanel"> Aktualne zadania dla ciebie </div>
                <div className="gridpanel"> Twoje wyniki </div>

            </div>
        </div>
    );
    };

export default MainPanel;