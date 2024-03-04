import { useAtom } from 'jotai';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authenticated } from '../../App';
import { useState } from 'react';

function Form(){
    const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleConnect = async (event: { preventDefault: () => void; }) => {
        
        event.preventDefault();

        try {
            const response = await fetch('https://studious-lamp-p45x777q9rp27gx5-5000.app.github.dev/api/login', {
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
            setUserAuthenticated(newAuthState);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return(
        <form>
            <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                    TickBox ID
                </label>
                <div className="relative">
                    <FaRegUser size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input value = {username} onChange ={(e) => setUsername(e.target.value)} name='username' type="text" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your Username'/>
                </div>
            </div>
            <div className="mb-6 relative">
                <label className="block mb-2 text-xl font-medium">
                    Password
                </label>
                <div className="relative">
                    <RiLockPasswordLine size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input value = {password} onChange ={(e) => setPassword(e.target.value)} name='password' type="password" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your password'/>
                </div>
            </div>
            <div className='flex justify-center'>
                <button type='submit' onClick={handleConnect} className="text-white text-ml font-medium rounded-md px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700">
                    Connect
                </button>
            </div>
        </form>
    )    
}

export default Form