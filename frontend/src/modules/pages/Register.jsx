import { Input } from '../components';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <section className="auth-page">
                <form method="POST">
                    <h4 className="auth-heading">Story <span>Times</span></h4>
                    <p className='text-heading-clr mb-7'>Create an account to enjoy reading.</p>
                    <Input
                        type="text"
                        placeholder="Full Name"
                        id="fullname"
                        required="true"
                    />
                    <Input
                        type="text"
                        placeholder="Email Id."
                        id="email"
                        required="true"
                    />
                    <Input
                        type="text"
                        placeholder="Username"
                        id="username"
                        required="true"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        id="password"
                        required="true"
                    />
                    <button className="button-block" type="submit">Register</button>
                </form>
                <ul>
                    <li>
                        <Link to="/login">Login to Account</Link>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Register;