import {BsFillPeopleFill} from 'react-icons/bs';
import {MdAttachMoney} from 'react-icons/md';
import {FaPoo, FaTasks} from 'react-icons/fa';
import {RxFace}    from 'react-icons/rx';

const Sidebar = () => {
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
            <p className='text-center'>User1234</p>
            <div className='h-1 bg-infored'></div>
            <SidebarIcon Icon={<FaPoo size="60"/>}/>
            <SidebarIcon Icon={<MdAttachMoney size="60"/>}/>
            <SidebarIcon Icon={<BsFillPeopleFill size="60"/>}/>
            <SidebarIcon Icon={<FaTasks size="60"/>}/>
        </div>
    );
};

const SidebarIcon = ({Icon}) => {
    return (
    <div className="sidebar-icon">
        {Icon}
    </div>
    );
}

export default Sidebar;