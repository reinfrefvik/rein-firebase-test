import { useState } from "react";
import "../ProfilePage.css"; // Import your CSS file for styling

interface editPasswordProps {}

const EditPassword = (props: editPasswordProps) => {
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitPassword = (e) => {
    e.preventDefault();
    if (editPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };

  return (
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
                <label htmlFor="confirmPassword">Confirm Password:</label>
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
  );
};

export { EditPassword };
