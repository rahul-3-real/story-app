import { Input, Switch } from '../components';
import { Link } from 'react-router-dom';

const Login = () => {
    const LoginFormHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <section className="auth-page">
                <form method="POST">
                    <h4 className="auth-heading">Story <span>Times</span></h4>
                    <p className='text-heading-clr mb-7'>Login to enjoy reading.</p>
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
                    <div className="d-flex align-center justify-between mb-4">
                        <label htmlFor="rememberMe" className='form-label text-text-clr'>Remember Me</label>
                        <Switch type="checkbox" id="rememberMe" />
                    </div>
                    <button className="button-block" type="submit" onClick={LoginFormHandler}>Login</button>
                </form>
                <ul>
                    <li>
                        <Link to="/register">Create Account</Link>
                    </li>
                    <li>
                        <Link to="/">Forgot Password</Link>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Login;