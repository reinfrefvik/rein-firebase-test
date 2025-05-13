import { useContext, useState } from "react";
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
      <div className="flex flex-col justify-center items-center w-full">
        <div className="justify-center p-4 bg-white rounded-md shadow-md m-4 text-center">
          <span>Updating User</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-full">
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
