import {BsFillPeopleFill} from 'react-icons/bs';
import {MdAttachMoney} from 'react-icons/md';
import {FaPoo, FaTasks} from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-44
                        flex flex-col
                        bg-sidebarblue text-white ">
            <SidebarIcon Icon={<FaPoo size="82"/>}/>
            <SidebarIcon Icon={<MdAttachMoney size="82"/>}/>
            <SidebarIcon Icon={<BsFillPeopleFill size="82"/>}/>
            <SidebarIcon Icon={<FaTasks size="82"/>}/>
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