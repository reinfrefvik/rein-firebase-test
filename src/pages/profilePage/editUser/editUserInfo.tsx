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
    <div className="form-container">
      <div className="profile-dividers">User Info:</div>
      <form className="profile-form" onSubmit={submitUserData}>
        <table className="profile-form">
          <tbody>
            <tr>
              <th className="form-label">
                <label htmlFor="name">Name:</label>
              </th>
              <th>
                <input
                  type="text"
                  id="name"
                  defaultValue={displayName}
                  ref={displayNameRef}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  required
                />
              </th>
            </tr>
            <tr>
              <th className="form-label">
                <label htmlFor="email">Email:</label>
              </th>
              <th>
                <input type="text" id="email" value={email} required disabled />
              </th>
            </tr>
            <tr>
              <th colSpan={2}>
                <div className="form-submit">
                  {editDisplayName !== "" &&
                    editDisplayName !== displayName && (
                      <button
                        className="submit-btn"
                        type="reset"
                        onClick={resetForm}
                      >
                        Reset
                      </button>
                    )}
                  <button
                    className="submit-btn"
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
