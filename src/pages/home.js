import React from 'react';
import ProfileComponent from '../components/profile';
import PostComponent from '../components/post';

import SearchFriendComponent from '../components/search-friends';

const HomePage = () => {
    return (
        <div className='main-box-container'>
            <div className='heading-container'>
                <h1 className='heading-text'>Friends Zone</h1>
            </div>
            <div className='body-container'>
                <div className='leftside-content'>
                    <h3 className='heading-text'>Profile Section</h3>
                    <ProfileComponent></ProfileComponent>
                </div>
                    <PostComponent></PostComponent>
                <div className='rightside-content'>
                    <div className='friendslist-data-container'>
                        <div>
                            <SearchFriendComponent></SearchFriendComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;