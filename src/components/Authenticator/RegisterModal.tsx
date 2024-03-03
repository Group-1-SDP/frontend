import { ImCross } from "react-icons/im";
import RegisterForm from "./RegisterModalForm";
import Logo from "../Utils/Logo";

interface RegisterModalProps {
    registerModalVisible: boolean;
    closeRegisterModal: () => void;
    openLoginModal: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ registerModalVisible, closeRegisterModal, openLoginModal}) => {
    return (
        <div className={`fixed left-0 top-0 ${(registerModalVisible) ? 'opacity-100' : 'opacity-0 invisible'}`}>
        <div className='bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center'>
            <div className='bg-white rounded-lg shadow-lg px-10 pt-5 pb-5 w-[30%]' style={{ position: 'relative' }}>
                <div className='flex-grow'>
                    <div className='flex justify-center'>
                        <Logo height="50px"/>
                    </div>
                    <div className='text-4xl font-bold'>Registration</div>
                    <RegisterForm/>
                </div>
                <div className='flex justify-center text-base mt-2'>
                    Already have an account?
                    &nbsp;
                    <button className="text-blue-700" onClick={openLoginModal}>Sign in</button>
                </div>
                <button onClick={closeRegisterModal} className="text-gray-600 hover:text-gray-800 absolute top-3 right-3" type="button">
                    <ImCross size={20}/>
                </button>
            </div>
        </div>
        </div>
    );
};

export default RegisterModal;
