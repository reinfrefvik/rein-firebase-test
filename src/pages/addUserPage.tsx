import AddUserForm from "../components/addUser/addUser";
import { Login } from "../components/login"

const AddUserPage = () => {
    return (
        <>
          <div>
            <Login />
          </div>
          <div>
            <AddUserForm />
          </div>
        </>
    )
}

export default AddUserPage;