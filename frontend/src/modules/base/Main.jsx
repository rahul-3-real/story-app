import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Authenticated, UnAuthenticated } from './index';

const Main = () => {
    // State
    const [themeMode, setThemeMode] = useState('dark');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const hideMainPaths = ['/login', '/register'];
    const { pathname } = useLocation();

    // Effect
    useEffect(() => {
        document.querySelector('body').setAttribute('data-theme', themeMode);
        if (localStorage.getItem('Theme Mode')) {
            const val = localStorage.getItem('Theme Mode');
            localStorage.setItem('Theme Mode', val);
            setThemeMode(val);
        } else {
            localStorage.setItem('Theme Mode', themeMode);
            setThemeMode(themeMode);
        }
    }, [themeMode]);

    return (
        <>
            {
                isAuthenticated ?
                    <Authenticated
                        pathname={pathname}
                        hideMainPaths={hideMainPaths}
                        isAuthenticated={isAuthenticated}
                        themeModesetIsAuthenticated={setIsAuthenticated}
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                    /> :
                    <UnAuthenticated
                        pathname={pathname}
                        hideMainPaths={hideMainPaths}
                        isAuthenticated={isAuthenticated}
                        setIsAuthenticated={setIsAuthenticated}
                    />
            }
        </>
    );
};

export default Main;