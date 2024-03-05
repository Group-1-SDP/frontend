import React from "react";

interface DeleteUserButtonInterface {
  onClick: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonInterface> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="text-white text-2xl font-medium rounded-md px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700"
        type="button"
      >
        Delete User
      </button>
    </div>
  );
};

export default DeleteUserButton;
