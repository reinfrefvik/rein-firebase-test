import { User } from "firebase/auth";
import { EditPassword } from "./editPassword";
import { EditUserInfo } from "./editUserInfo";

interface editUserProps {
  user: User | null;
  setIsUpdating: (bool: boolean) => any;
  handleUpdateUser: (displayName: string) => any;
}

const EditUser = (props: editUserProps) => {
  return (
    <div className="profile-card">
      <div className="card-title">Edit User</div>
      <div className="card-body">
        <EditUserInfo {...props} />
        <EditPassword />
      </div>
    </div>
  );
};

export { EditUser };
