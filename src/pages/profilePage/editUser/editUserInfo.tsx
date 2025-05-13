import { useRef, useState } from "react";

interface editUserInfoProps {
  user: any;
  setIsUpdating: (bool: boolean) => any;
  handleUpdateUser: (displayName: string) => any;
}

const EditUserInfo = (props: editUserInfoProps) => {
  const [editDisplayName, setEditDisplayName] = useState("");
  const displayNameRef = useRef(null);
  

  let displayName = props.user.displayName;
  let email = props.user.email;

  const submitUserData = async (e) => {
    e.preventDefault();
    if (editDisplayName.length < 3) {
      alert("Name is too short");
      return;
    }

    props.setIsUpdating(true);

    const result = await props.handleUpdateUser(editDisplayName);
    if (result) {
      props.setIsUpdating(false);
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setEditDisplayName(props.user.displayName);
    displayNameRef.current.value = props.user.displayName;
  };

  return (
    <div className="pt-4">
      <div className="text-start border-b-2 border-gray-200 mb-3">User Info:</div>
      <form className="w-full" onSubmit={submitUserData}>
        <table className="w-full">
          <tbody>
            <tr>
              <th className="text-start">
                <label htmlFor="name">Name:</label>
              </th>
              <th className="w-[50%]">
                <input
                  type="text"
                  id="name"
                  className="w-full"
                  defaultValue={displayName}
                  ref={displayNameRef}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  required
                />
              </th>
            </tr>
            <tr>
              <th className="text-start">
                <label htmlFor="email">Email:</label>
              </th>
              <th>
                <input type="text" id="email" value={email} required disabled />
              </th>
            </tr>
            <tr>
              <th colSpan={2}>
                <div className="w-full flex justify-end">
                  {editDisplayName !== "" &&
                    editDisplayName !== displayName && (
                      <button
                        className="bg-blue-500 disabled:bg-gray-300 rounded-sm p-1"
                        type="reset"
                        onClick={resetForm}
                      >
                        Reset
                      </button>
                    )}
                  <button
                    className="bg-green-500 disabled:bg-gray-300 rounded-sm p-1 ml-2"
                    type="submit"
                    disabled={
                      editDisplayName === "" || editDisplayName === displayName
                        ? true
                        : false
                    }
                  >
                    Update
                  </button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export { EditUserInfo };
