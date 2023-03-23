import {MdTaskAlt} from 'react-icons/md';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../firebase';

const Tasks = () => {
    return (       
        <div className="bg-gray-100 min-h-screen p-4  
        flex flex-auto justify-center items-center"> 
        <div className=" bg-white h-[600px] w-[1000px] ml-32 shadow-2xl rounded-2xl border-2">
        <div className='border-b-4 border-blue-500 grid'>
        <MdTaskAlt className='' size={100} color='#3B82F6' />
        <p className='justify-self-end place-self-end text-5xl font-bold mr-4 mb-2'>Zadania</p>
        </div>
        <div></div>
        </div>           

</div> );
};

export default Tasks;