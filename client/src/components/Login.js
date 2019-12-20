import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = props => {
    const [usernameInput,setUsernameInput] = useState('');
    const [passwordInput,setPasswordInput] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post('/login', {username: usernameInput, password: passwordInput})
            .then(res => {
                localStorage.setItem('token', res.data.payload);
				setUsernameInput('');
				setPasswordInput('');
				props.history.push('/bubbles');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>	
			<h1>Welcome to the Bubble App!</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' value={usernameInput} onChange={e => setUsernameInput(e.target.value)}/>
                
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)}/>
                
                <button type='submit'>Log In</button>
            </form>
        </>
    );
};

export default Login;