import {BiDollar} from 'react-icons/bi'

const Finances = () => {
    return ( 
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center"> 
                        <div className=" bg-gray-200 h-[600px] w-[1000px] ml-32 shadow-2xl rounded-lg">
                            <BiDollar className='' size={120} color='green' />
                        </div>           
        
        </div>
    );
};

export default Finances