import { Link } from "react-router-dom";
import { BsArrowRight } from 'react-icons/bs';

const Home = () => {
    return (
        <>
            <section className="home-page">
                <div className="container">
                    <Link to="/" className="featured-card">
                        <h4>The Little Leaf</h4>
                        <h5>John Doe</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos delectus eos aut laborum iure maxime architecto expedita possimus laudantium saepe pariatur tempora molestiae repellendus, cum quo odit praesentium dolores deserunt beatae rem blanditiis est totam! Aperiam repudiandae dolorum facilis voluptas facere accusantium sunt hic, at eveniet architecto perspiciatis assumenda.</p>
                        <div className="overlay">
                            <h6>
                                <span>Continue Reading</span>
                                <BsArrowRight />
                            </h6>
                        </div>
                    </Link>

                    <h4 className="sub-heading">Latest Releases</h4>
                    <div className="release-cards">
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
                </div >
            </section>
        </>
    );
};

export default Home;