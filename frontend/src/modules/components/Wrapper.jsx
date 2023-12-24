import { Outlet } from 'react-router-dom';
import { Sidebar, DefaultSidebar } from './index';

const Wrapper = () => {
    return (
        <div className='content'>
            <div className='section'>
                <Outlet />
            </div>
            <Sidebar>
                <DefaultSidebar />
            </Sidebar>
        </div>
    );
};

export default Wrapper;