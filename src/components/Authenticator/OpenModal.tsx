import React from "react"

interface ConnectButtonInterface{
    onClick: () => void;
}

const ConnectButton: React.FC<ConnectButtonInterface> = ({ onClick }) => {
    return (
      <div className='flex justify-center'>
        <button onClick={onClick} className="text-white text-2xl font-medium rounded-md px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700" type="button">
          Connect to Box
        </button>
      </div>
    );
  };

export default ConnectButton