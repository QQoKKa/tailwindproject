import {BiDollar} from 'react-icons/bi'

import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';

const date = new Date();
const Finances = () => {
const saldo = 1000;
const electricity = 100;
const gas = 100;
const water = 100;
const heating = 100;
const employees = 800;
const expenses = electricity + gas + water + heating + employees;
const income = 1200;
const profit_t_month = income - expenses;
const profit_t_year = 12000;
const profit_l_year = 10000;
const monthtable = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
let month = date.getMonth();
let year = date.getFullYear();
    for (let i = 0; i < 12; i++) {
        switch (month) {
            case i: 
                month = monthtable[i];
                break;
            default:
        }
    }

    return ( 
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center"> 
                        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
                            <div className=' border-b-4 border-underscoregreen grid '>
                            <BiDollar className='' size={120} color='green' />
                            <p className=' justify-self-end place-self-end text-5xl font-bold mr-4 mb-2'>{month}:{year}</p>
                            </div>
                            <div className=' grid grid-cols-2 grid-rows-2 gap-4'>
                            <div className=' font-bold m-12 border-b-2 border-underscoregreen' >
                                <p>  Prąd: {electricity}zł        </p>
                                <p>  gaz: {gas}{}                 </p>
                                <p>  woda: {water}zł              </p>
                                <p>  ogrzewanie: {heating}zł      </p>
                                <p>  pracownicy: {employees}zł    </p>
                                <div className='grid'>
                                    <Button> edytuj</Button>
                                <p className='text-end'>Wydatki: {expenses}zł</p>
                                </div>
                            </div>
                            <div className='grid font-bold m-12 border-b-2 border-underscoregreen'>
                                <p>Przychód z usług: {income}zł <button></button></p>
                                <p className='place-self-end'>Przychody: {income}zł</p>
                            </div>
                            <div className=' grid font-bold m-12 mt-[-55px] mb-40 border-b-2 border-underscoregreen'>
                                <p><Button >Edytuj</Button> Saldo z poprzedniego miesiąca: {saldo}zł </p>
                                <p className=' place-self-end '> Saldo: {saldo}zł </p>
                                </div>
                            <div className=' grid font-bold m-12 mt-[-55px] mb-40 border-b-2 border-underscoregreen'>
                                <p>Zysk z tego miesiąca: {profit_t_month}zł <button></button></p>
                                <p>Zysk z tego roku: {profit_t_year}zł <button></button></p>
                                <p>Zysk z poprzedniego roku: {profit_l_year}zł <button></button></p>
                                <p className='place-self-end'>Zysk: {profit_t_month}zł</p>
                                </div>
                            </div>
                        </div>           
        </div>
    );
};
const Button = ({ onClick, children }) => {
    return (
      <button className=' self-end justify-self-start mb-1 inline-block rounded bg-sidebarblue px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal
                        text-white shadow-[0_4px_9px_-4px_#3b71ca] 
                          transition duration-150 ease-in-out hover:bg-sidebarbluehover hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                          focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
                          active:bg-blue-200 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' 
                          type="button" onClick={onClick}>
        {children}
      </button>
    );
  };

export default Finances