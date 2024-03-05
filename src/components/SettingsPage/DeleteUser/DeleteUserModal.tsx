import React from "react";
import { ImCross } from "react-icons/im";
import DeleteUserForm from "./DeleteUserForm";

interface DeleteUserModalInterface {
  DeleteUserVisible: boolean;
  closeDeleteUserModal: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalInterface> = ({
  DeleteUserVisible,
  closeDeleteUserModal,
}) => {
  return (
    <div
      className={`fixed left-0 top-0 ${
        DeleteUserVisible ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center ">
        <div
          className="bg-white rounded-lg shadow-lg px-10 pt-5 pb-5 w-[30%]"
          style={{ position: "relative" }}
        >
          <button
            onClick={closeDeleteUserModal}
            className="text-gray-600 hover:text-gray-800 absolute top-3 right-3"
            type="button"
          >
            <ImCross size={20} />
          </button>
          <DeleteUserForm />
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
