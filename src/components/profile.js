import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileComponent = () => {

    const baseURL = "http://localhost:4000/api";

    const [profileUserInfo, setProfileUserInfo] = useState({
        name: '',
        bio: '',
        image: null,
    });

    const [isEditProfile, setIsEditProfile] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        const url = baseURL + "/profile";
        axios.get(url)
            .then((response) => {
                setProfileUserInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleInputChange = (event) => {
        setProfileUserInfo({ ...profileUserInfo, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setProfileUserInfo({ ...profileUserInfo, image: e.target.result });
            };

            reader.readAsDataURL(file);
        }
    };

    const updateProfile = () => {
        setIsEditProfile(true);
    }
   
    const saveProfile = () => {
        setIsEditProfile(false);
        const url = baseURL + "/update/profile";
        console.log(profileUserInfo);
        axios.post(url, profileUserInfo)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className='profile-content'>
            { isEditProfile ? 
            <div>
                <label>Update Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
                :
                <img src={profileUserInfo.image} className='profile-image' alt='' />
            }   
            <br></br>
            {
                isEditProfile ? 
                <input type="text" placeholder='Enter your name' name="name" value={profileUserInfo.name} onChange={handleInputChange} />
                :
                <span>{profileUserInfo.name}</span>
            }
            <br></br>
            {
                isEditProfile ? 
                <textarea name="bio" placeholder='Enter your bio' value={profileUserInfo.bio} onChange={handleInputChange} />
                :
                <span>{profileUserInfo.bio}</span>
            }
            <br></br>

            
            {
                isEditProfile ? 
                <button onClick={() => saveProfile()}>Save</button>
                :
                <button onClick={() => updateProfile()}>Update</button>
            } 
        </div>
    );
};

export default ProfileComponent;