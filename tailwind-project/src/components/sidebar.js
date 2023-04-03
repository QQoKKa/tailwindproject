import {BsFillPeopleFill,BsDisplay} from 'react-icons/bs';
import {MdAttachMoney} from 'react-icons/md';
import { FaTasks} from 'react-icons/fa';
import {RxFace}    from 'react-icons/rx';
import { useEffect, useState } from 'react';
import {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from '../dbemp';


const Sidebar = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getDocsFromCollection() {
          const docRef = collection(db, "emp");
          const docSnap = await getDocs(docRef);
          const data = [];
          docSnap.forEach((doc) => {
            data.push(doc.data());
          });
          setUserData(data);
        }
    
        getDocsFromCollection().catch((error) => {
          // Handle any errors that occur
          console.error(error);
        });
      }, []);

    return (
        <div className="fixed top-0 left-0 h-screen w-44
                        flex flex-col
                        bg-sidebarblue text-white ">
            <div className='relative flex items-center justify-center
                            h-36 w-36 mt-6 mb-2 mx-auto
                            shadow-lg
                            bg-blue-900 text-infored'>
                <RxFace size="60" className="text-center"/>
            </div>
            {userData && <p className='text-center'>{userData[0].name + " " +userData[0].surname}</p>}
            <div className='h-1 bg-infored'></div>
           <a href='/'> <SidebarIcon Icon={<BsDisplay size="50"/>} text='główny panel'/> </a>
           {/* <a href='/finances'> <SidebarIcon Icon={<MdAttachMoney size="50"/>} text='finanse'/></a> */}
           <a href='/employees'> <SidebarIcon Icon={<BsFillPeopleFill size="50"/>} text='pracownicy'/> </a>
           <a href='/tasks'> <SidebarIcon Icon={<FaTasks size="50"/>} text='zadania'/> </a>
        </div>
    );
};

const SidebarIcon = ({Icon,text = "tooltip"}) => {
    return (
    <div className="sidebar-icon group">
        {Icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
    );
}

export default Sidebar;