import { useState } from 'react';
import { Link } from "react-router-dom";
import { BsGrid, BsListTask } from 'react-icons/bs';

const Stories = () => {
    // State
    const [toggleView, setToggleView] = useState('grid'); // grid, list

    // Change View Handler
    const changeViewHandler = (view) => {
        setToggleView(view);
    };

    return (
        <>
            <section className="stories-page">
                <div className="container">
                    <div className="d-flex justify-between align-center mb-4">
                        <h4 className="sub-heading mb-0">Latest Releases</h4>
                        <div className="view-option">
                            <button className={toggleView === 'grid' ? 'active' : ''} onClick={() => changeViewHandler('grid')}>
                                <BsGrid />
                            </button>
                            <button className={toggleView === 'list' ? 'active' : ''} onClick={() => changeViewHandler('list')}>
                                <BsListTask />
                            </button>
                        </div>
                    </div>
                    <div className={`release-cards ${toggleView === 'grid' ? 'grid-view' : 'list-view'}`}>
                        <div className="story-card">
                            <h4>
                                <Link to="/">The Little Leaf</Link>
                            </h4>
                            <h5>
                                <Link to="/">John Doe</Link>
                            </h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur rem, rerum, expedita alias ut harum atque aperiam laudantium eius porro vitae, asperiores sunt eum ullam...</p>
                            <div className="info">
                                <Link to="/" className="button-sm">Read Story</Link>
                                <h6>
                                    <span>4.5K</span> Read
                                </h6>
                            </div>
                        </div>
                        <div className="story-card">
                            <h4>
                                <Link to="/">The Little Leaf</Link>
                            </h4>
                            <h5>
                                <Link to="/">John Doe</Link>
                            </h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur rem, rerum, expedita alias ut harum atque aperiam laudantium eius porro vitae, asperiores sunt eum ullam...</p>
                            <div className="info">
                                <Link to="/" className="button-sm">Read Story</Link>
                                <h6>
                                    <span>4.5K</span> Read
                                </h6>
                            </div>
                        </div>
                        <div className="story-card">
                            <h4>
                                <Link to="/">The Little Leaf</Link>
                            </h4>
                            <h5>
                                <Link to="/">John Doe</Link>
                            </h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur rem, rerum, expedita alias ut harum atque aperiam laudantium eius porro vitae, asperiores sunt eum ullam...</p>
                            <div className="info">
                                <Link to="/" className="button-sm">Read Story</Link>
                                <h6>
                                    <span>4.5K</span> Read
                                </h6>
                            </div>
                        </div>
                        <div className="story-card">
                            <h4>
                                <Link to="/">The Little Leaf</Link>
                            </h4>
                            <h5>
                                <Link to="/">John Doe</Link>
                            </h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur rem, rerum, expedita alias ut harum atque aperiam laudantium eius porro vitae, asperiores sunt eum ullam...</p>
                            <div className="info">
                                <Link to="/" className="button-sm">Read Story</Link>
                                <h6>
                                    <span>4.5K</span> Read
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Stories;