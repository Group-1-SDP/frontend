import TopBar from "../components/Utils/TopBar"
import DeleteUserModal from "../components/SettingsPage/DeleteUser/DeleteUserModal"
import DeleteUserButton from "../components/SettingsPage/DeleteUser/DeleteUserButton";
import { useState } from "react";

function SettingsPage() {
  //Login Modal 
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const openDeleteModal = () => {
    setDeleteUserModalVisible(true);
  };
  const closeDeleteModal = () => {
    setDeleteUserModalVisible(false);
  };
  
    return (
      <div>
        <TopBar/>
        <DeleteUserButton onClick={openDeleteModal} />
        <DeleteUserModal DeleteUserVisible={deleteUserModalVisible} closeDeleteUserModal={closeDeleteModal}/>
      </div>
    )
  }
  
  export default SettingsPage