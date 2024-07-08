import React, { useContext, useState } from 'react';
import './MagicItemPage.css'; // Import your CSS file for styling
import { AuthContext } from '../../contexts/authContexts';
import AddMagicItem from '../../components/magicItem/magicItem';

const MagicItemPage = () => {
  const {user} = useContext(AuthContext);

  if(!user) {
    return (
        <div>
            <span>Fetching User</span>
        </div>
    )
  }

  
  return (
    <div className='profile-body'>
        <div className='profile-card'>
            <div className='card-title'>Magic Item Page</div>
            <div className='card-body'>
                <AddMagicItem />
            </div>
        </div>
    </div>
  );
};

export default MagicItemPage;
