import React, { useContext, useState } from 'react';
import './ProfilePage.css'; // Import your CSS file for styling
import { AuthContext } from '../../contexts/authContexts';

const ProfilePage = () => {
  const {user, signIn, signOut, createUser, updateUser} = useContext(AuthContext);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhotoURL, setEditPhotoURL] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if(!user) {
    return (
        <div>
            <span>Fetching User</span>
        </div>
    )
  }

  console.log(user)
  let displayName = user.displayName;
  let email = user.email;
  let photoURL = user.photoURL;

  const submitUserData = (e) => {
    e.preventDefault();
    console.log('submitting user data')
    if (editDisplayName.length < 3) {
      alert('this only works on username')
    }
    if (editDisplayName.length < 3 && editEmail.length < 3) {
      alert('something must have been changed');
      return;
    }


    updateUser(editEmail.length > 3 ? editEmail : false, false, editDisplayName.length > 3 ? editDisplayName : false, false);
  }

  const submitPassword = (e) => {
    e.preventDefault();
    console.log('submitting password')
  }
  
  return (
    <div className='profile-body'>
        <div className='profile-card'>
            <div className='card-title'>Edit profile page</div>
            <div className='card-body'>
            <div className='form-container'>
              <div className='profile-dividers'>User Info:</div>
              <form className='profile-form' onSubmit={submitUserData}>
                <table className='profile-form'>
                  <tr>
                    <th className='form-label'>
                      <label htmlFor="name">Name:</label>
                    </th>
                    <th>
                      <input
                        type="text"
                        id="name"
                        value={displayName}
                        onChange={(e) => setEditDisplayName(e.target.value)}
                        required
                      />
                    </th>
                  </tr>
                  <tr>
                    <th className='form-label'>
                      <label htmlFor="email">Email:</label>
                    </th>
                    <th>
                      <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEditEmail(e.target.value)}
                        required
                      />
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={2}>
                      <div className='form-submit'>
                        <button className='submit-btn' type="submit">Update</button>
                      </div>
                    </th>
                  </tr>
                </table>
              </form>
            </div>

            <div className='form-container'>
              <div className='profile-dividers'>Password:</div>
              <form className='profile-form' onSubmit={submitPassword}>
                <table>
                  <tr>
                    <th className='form-label'>
                      <label htmlFor="password">Password:</label>
                    </th>
                    <th>
                      <input
                        type="password"
                        id="password"
                        value={''}
                        placeholder='*****'
                        onChange={(e) => setEditPassword(e.target.value)}
                        required
                      />
                    </th>
                  </tr>
                  <tr>
                    <th className='form-label'>
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                    </th>
                    <th>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={''}
                        placeholder='*****'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={2}>
                      <div className='form-submit'>
                        <button className='submit-btn' type="submit">Change Password</button>
                      </div>
                    </th>
                  </tr>
                </table>
              </form>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
