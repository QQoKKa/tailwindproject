import {BiDollar} from 'react-icons/bi'

const Finances = () => {
const saldo = 1000;
const expenses = 200;
const employees = 800;
const income = 1200;
const profit_t_month = income - expenses;
const profit_t_year = 0;
const profit_t_all = 0;
const profit_l_month = 0;
const profit_l_year = 0;
const profitover_l_month = profit_t_month - profit_l_month;
    return ( 
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center"> 
                        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
                            <div className=' border-b-4 border-underscoregreen flex flex-row '>
                            <BiDollar className='' size={120} color='green' />
                            <p className='justify-self-end place-self-end'>Nazwa Firmy</p>
                            </div>
                            <div></div>
                        </div>           
        
        </div>
    );
};

export default Finances