import React, { useContext, useRef, useState } from "react";
import "./ProfilePage.css"; // Import your CSS file for styling
import { AuthContext } from "../../contexts/authContexts";

const ProfilePage = () => {
  const { user, signIn, signOut, createUser, updateUser } =
    useContext(AuthContext);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhotoURL, setEditPhotoURL] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const displayNameRef = useRef(null);
  const emailRef = useRef(null);

  if (!user) {
    return (
      <div>
        <span>Fetching User</span>
      </div>
    );
  }

  let displayName = user.displayName;
  let email = user.email;

  const submitUserData = async (e) => {
    e.preventDefault();
    if (editDisplayName.length < 3) {
      alert("Name is too short");
      return;
    }

    setIsUpdating(true);

    const result = await updateUser({ displayName: editDisplayName });
    if (result) {
      setIsUpdating(false);
    }
  };

  const submitPassword = (e) => {
    e.preventDefault();
    // this does nothing
  };

  const resetForm = (e) => {
    e.preventDefault();
    setEditDisplayName(user.displayName);
    setEditEmail(user.email);
    displayNameRef.current.value = user.displayName;
    emailRef.current.value = user.email;
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
        <div className="profile-card">
          <div className="card-title">Edit User</div>
          <div className="card-body">
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
                        <input
                          type="text"
                          id="email"
                          defaultValue={email}
                          ref={emailRef}
                          onChange={(e) => setEditEmail(e.target.value)}
                          required
                        />
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={2}>
                        <div className="form-submit">
                          {((editDisplayName === "" ||
                            editDisplayName === displayName) &&
                            (editEmail === "" || editEmail === email)) || (
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
                              (editDisplayName === "" ||
                                editDisplayName === displayName) &&
                              (editEmail === "" || editEmail === email)
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

            <div className="form-container">
              <div className="profile-dividers">Password:</div>
              <form className="profile-form" onSubmit={submitPassword}>
                <table>
                  <tbody>
                    <tr>
                      <th className="form-label">
                        <label htmlFor="password">Password:</label>
                      </th>
                      <th>
                        <input
                          type="password"
                          id="password"
                          defaultValue={""}
                          placeholder="*****"
                          onChange={(e) => setEditPassword(e.target.value)}
                          required
                          disabled
                        />
                      </th>
                    </tr>
                    <tr>
                      <th className="form-label">
                        <label htmlFor="confirmPassword">
                          Confirm Password:
                        </label>
                      </th>
                      <th>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={""}
                          placeholder="*****"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          disabled
                        />
                      </th>
                    </tr>

                    <tr>
                      <th colSpan={2}>
                        <div className="form-submit">
                          <button className="submit-btn" type="submit" disabled>
                            Disabled
                          </button>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
