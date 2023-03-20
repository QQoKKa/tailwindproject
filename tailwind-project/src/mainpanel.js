const MainPanel = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center "> 
            <div className=" h-[600px] w-[1100px] ml-32 grid grid-cols-2 grid-rows-2  gap-4">
                <div className="gridpanel"> Zysk </div>
                <div className="gridpanel"> Najlepszy pracownik </div>
                <div className="gridpanel"> Aktualne zadania dla ciebie </div>
                <div className="gridpanel"> Twoje wyniki </div>

            </div>
        </div>
    );
    };

export default MainPanel;