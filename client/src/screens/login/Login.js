import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { request } from "../../utils/api-utils";
import { isLoggedIn, setUserInfo } from "../../utils/user-utils";
import styles from './styles';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    useEffect(() => {
        if(isLoggedIn()) {
            history.replace('/dashboard')
        }
    }, [history])

    const doLogin = (e) => {
       request.post(`/login`, {
           email: username,
           password: password
       })
       .then((response) => {
            if(response.data.status === false) {
                alert(response.data.message);
                return;
            }
            const userInfo = {
                token: response.data.token.token,
                name: response.data.token.name,
                image: response.data.image
            }
            setUserInfo(userInfo)
            history.replace('/dashboard')
       })
       .catch(error => {
            if(error) {
                console.log(error);
            }
       })
       e.preventDefault();
    }

    const renderLoginForm = () => {
        return <form onSubmit={e => {doLogin(e)}}>
            <div className="form-group">
                <input 
                    type="text" 
                    name="username" 
                    className="input-style" 
                    placeholder="Enter username" 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    name="pass" 
                    className="input-style" 
                    placeholder="Enter password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-expand">Login</button>
            </div>
        </form>
    }

    return <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
            <h3 className="title">Login</h3>
            {renderLoginForm()}
        </div>
    </div>
}
export default Login;