import { useAtom } from 'jotai';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authenticated } from '../../App';

function Form(){
    const [userAuthenticated, setUserAuthenticated] = useAtom(authenticated)
    const handleConnect = () => {
        const newAuthState = userAuthenticated === false ? true : false
        setUserAuthenticated(newAuthState)
    }

    return(
        <form>
            <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                    TickBox ID
                </label>
                <div className="relative">
                    <FaRegUser size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input type="text" id="large-input" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your TickBox ID'/>
                </div>
            </div>
            <div className="mb-6 relative">
                <label className="block mb-2 text-xl font-medium">
                    Password
                </label>
                <div className="relative">
                    <RiLockPasswordLine size={20} color='lightgray' className="absolute top-1/2 -translate-y-1/2 left-3"/>
                    <input type="password" id="large-input" className="pl-10 block w-full p-4 rounded-lg dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder='Enter your password'/>
                </div>
            </div>
            <div className='flex justify-center'>
                <button onClick={handleConnect} className="text-white text-ml font-medium rounded-md px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700">
                    Connect
                </button>
            </div>
        </form>
    )    
}

export default Form