import { useContext, useState } from "react";
import "./ProfilePage.css"; // Import your CSS file for styling
import { AuthContext } from "../../contexts/authContexts";
import { EditUser } from "./editUser/editUser";

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  if (!user) {
    return (
      <div>
        <span>Fetching User</span>
      </div>
    );
  }

  const handleUpdateUser = async (displayName: string) => {
    const result = await updateUser({ displayName });
    return result;
  };

  if (isUpdating) {
    return (
      <div className="profile-body">
        <div className="profile-card">
          <span>Updating User</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-body">
        <EditUser
          user={user}
          setIsUpdating={setIsUpdating}
          handleUpdateUser={handleUpdateUser}
        />
      </div>
    );
  }
};

export default ProfilePage;
