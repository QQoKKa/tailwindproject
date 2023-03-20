import {BsFillPersonFill} from 'react-icons/bs';

const Employees = () => {
    return (       
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className=' border-b-4 border-blue-500 flex flex-row '>
        <BsFillPersonFill className='' size={120} color='lightblue' />
        <p className='justify-self-end place-self-end'>Nazwa Firmy</p>
        </div>
        <div></div>
        </div>           

</div> );
};

export default Employees;