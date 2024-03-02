import { useAtom } from 'jotai';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authenticated } from '../../App';
import { useState } from 'react';

function RegisterForm(){
    const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleConnect = async (event: { preventDefault: () => void; }) => {
        
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        });
        if (response.status === 200) {
            const newAuthState = !userAuthenticated;
            setUserAuthenticated(newAuthState);
        }
        console.log(response.status);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return(
        <form>
            <div>
                <label className="block text-xl font-medium mb-1">
                    Username
                </label>
                <div className="relative">
                    <FaRegUser size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input value = {username} onChange ={(e) => setUsername(e.target.value)} type="text" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Username'/>
                </div>
            </div>

            <div>
                <label className="block text-xl font-medium mt-6 mb-1">
                    Email
                </label>
                <div className="relative">
                    <FaRegUser size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input value = {email} onChange ={(e) => setEmail(e.target.value)} type="text" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Email'/>
                </div>
            </div>

            <div>
                <label className="block mt-6 mb-1 text-xl font-medium ">
                    Password
                </label>
                <div className="relative">
                    <div className="relative flex items-center">
                        <RiLockPasswordLine size={20} color='lightgray' className="absolute left-3"/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Password'/>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-6'>
                <button type='submit' onClick={handleConnect} className="text-white text-xl font-medium block w-full p-3 rounded-lg text-center dark:bg-green-800 dark:hover:bg-green-900">
                    Register
                </button>
            </div>
        </form>
    )    
}

export default RegisterForm