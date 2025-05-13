import { useState } from "react";

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
    <div className="pt-4 ">
      <div className="text-start border-b-2 border-gray-200 mb-3">Password:</div>
      <form className="w-full" onSubmit={submitPassword}>
        <table className="w-full">
          <tbody>
            <tr>
              <th className="text-start">
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
              <th className="text-start">
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
                <div className="w-full flex justify-end">
                  <button className="bg-green-500 disabled:bg-gray-300 rounded-sm p-1" type="submit" disabled>
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
