import { useAtom } from 'jotai';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authenticated } from '../../App';
import { useEffect, useState } from 'react';
import { usernameAtom } from '../Utils/GlobalState';

function LoginForm(){
    const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated)
    const [username, setUsername] = useAtom(usernameAtom);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    const handleConnect = async (event: { preventDefault: () => void; }) => {
        
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        if (response.status === 200) {
            const newAuthState = !userAuthenticated;
            setUsername(username);
            setUserAuthenticated(newAuthState);
            console.log(response.status);
        }
        else if (response.status === 404) {
            setError('User does not exist');
        }
        else if (response.status === 401) {
            setError('Password is Invalid');
        }

        } catch (error) {
        console.error('Error:', error);
        }
    };

    return(
        <form className='mt-4'>
            <div className="mb-6">
                <label className="block mb-1 text-xl font-medium">
                    Username
                </label>
                <div className="relative">
                    <FaRegUser size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input value = {username} onChange ={(e) => setUsername(e.target.value)} name='username' type="text" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your Username'/>
                </div>
            </div>
            <div className="mb-6 relative">
                <label className="block mb-1 text-xl font-medium">
                    Password
                </label>
                <div className="relative">
                    <div className="relative flex items-center">
                        <RiLockPasswordLine size={20} color='lightgray' className="absolute left-3"/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your password'/>
                    </div>
                    <div className='flex justify-end text-sm text-blue-700 mt-2'>Forgot Password?</div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button type='submit' onClick={handleConnect} className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-green-800 dark:hover:bg-green-900">
                    Login
                </button>
            </div>
            
            <div className="text-red-500 text-center mt-2">
                {error}
            </div>
            
        </form>
    )    
}

export default LoginForm