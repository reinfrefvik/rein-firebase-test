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
    <div className="justify-center p-4 bg-white rounded-md shadow-md m-4 text-center">
      <div className="semi-bold">Edit User</div>
        <EditUserInfo {...props} />
        <EditPassword />
    </div>
  );
};

export { EditUser };
