import { useState } from 'react';
import { HiBars3, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { RiSearchLine } from 'react-icons/ri';

const Header = ({ navbarStatus, setNavbarStatus, themeMode, setThemeMode }) => {
    // State
    const [dropdownStatus, setDropdownStatus] = useState(false);

    // Function
    const changeTheme = (mode) => {
        if (mode == 'light') {
            setThemeMode('light');
            localStorage.setItem('Theme Mode', 'light');
        } else if (mode == 'dark') {
            setThemeMode('dark');
            localStorage.setItem('Theme Mode', 'dark');
        } else {
            setThemeMode(!themeMode);
            localStorage.setItem('Theme Mode', themeMode);
        }

        setDropdownStatus(!dropdownStatus);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="inner">
                    <button className="sidebar-toggle" onClick={() => { setNavbarStatus(!navbarStatus); }}>
                        <HiBars3 />
                    </button>
                    <form className='search-form'>
                        <input type="search" placeholder='Type here to search' />
                        <button>
                            <RiSearchLine />
                        </button>
                    </form>
                    <div className={`dropdown ${dropdownStatus ? '' : 'hide'}`}>
                        <button className="theme-toggle" onClick={() => setDropdownStatus(!dropdownStatus)}>
                            {themeMode == 'dark' ? <HiOutlineMoon /> : <HiOutlineSun />}
                        </button>
                        <ul className="dropdown-menu">
                            {dropdownStatus ? (
                                <>
                                    <li onClick={() => changeTheme('light')}>
                                        <HiOutlineSun />
                                        <span>Light Mode</span>
                                    </li>
                                    <li onClick={() => changeTheme('dark')}>
                                        <HiOutlineMoon />
                                        <span>Dark Mode</span>
                                    </li>
                                </>
                            ) : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;