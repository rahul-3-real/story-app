import { Link } from 'react-router-dom';

const DefaultSidebar = () => {
    // Links
    const links = ['Drama', 'Fiction', 'Fantasy', 'Fairy Tail', 'Historical'];
    return (
        <>
            <h4 className="sub-heading">Genres</h4>
            <ul className='list'>
                {links.map((link) => (
                    <li key={link} className='list-item'>
                        <Link to={`/${link}`} className='list-link'>{link}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DefaultSidebar;