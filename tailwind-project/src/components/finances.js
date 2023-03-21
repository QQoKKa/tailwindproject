import {BiDollar} from 'react-icons/bi'
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
        }
    }

    return ( 
        <div className="bg-gray-100 min-h-screen p-4  
                        flex flex-auto justify-center items-center"> 
                        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
                            <div className=' border-b-4 border-underscoregreen grid '>
                            <BiDollar className='' size={120} color='green' />
                            <p className='justify-self-end place-self-end text-5xl font-bold mr-4 mb-2'>{month}:{year}</p>
                            </div>
                            <div className='grid grid-cols-2 grid-rows-2 gap-4'>
                            <div className=' m-12 border-b-2 border-underscoregreen' >
                                <p>Prąd: {electricity}zł <button></button></p> 
                                <p>gaz: {gas}{} <button></button></p>
                                <p>woda: {water}zł <button></button></p>
                                <p>ogrzewanie: {heating}zł <button></button></p>
                                <p>pracownicy: {employees}zł <button></button></p>
                                <p className='text-end'>Wydatki: {expenses}zł</p>
                            </div>
                            <div className=' m-12 border-b-2 border-underscoregreen'>Przychody: {income}zł
                                <p>Przychód z usług: {income}zł <button></button></p>
                            </div>
                            <div className=' m-12 mt-0 mb-24 border-b-2 border-underscoregreen'>Saldo: {saldo}zł
                                <p>Saldo z poprzedniego miesiąca: {saldo}zł <button></button></p>
                                </div>
                            <div className=' m-12 mt-0 mb-24 border-b-2 border-underscoregreen'>Zysk: {profit_t_month}zł
                                <p>Zysk z tego miesiąca: {profit_t_month}zł <button></button></p>
                                <p>Zysk z tego roku: {profit_t_year}zł <button></button></p>
                                <p>Zysk z poprzedniego roku: {profit_l_year}zł <button></button></p>
                                </div>
                            </div>
                        </div>           
        </div>
    );
};

export default Finances