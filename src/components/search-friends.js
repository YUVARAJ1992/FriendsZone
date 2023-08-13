import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchFriendComponent = () => {

    const baseURL = "http://localhost:4000/api";
    const [friendslist, setFriendsList] = useState([])
    const [searchFriendList, setSearchFriendList] = useState([]);

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = () => {
        const url = baseURL + "/list/friends";

        axios.get(url)
            .then((response) => {
                setFriendsList(response.data);
                setSearchFriendList(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleSearchFriend = (event) => {
        // console.log(event.target.value);
        const filteredList = friendslist.filter((value, index) => {
            return value.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setSearchFriendList(filteredList)
    }


    return (
        <div>
            <h3 className='heading-text'>Friend List</h3>
            <input type="text" onChange={handleSearchFriend} placeholder='Search Friends' className='search-friend-input' />

            <div className='row'>
                {
                    searchFriendList.map((value, index) => {
                        return (
                            <div className='friends-container' key={index}>
                                <img className="friends-image" src={value.image} alt='' />
                                <p className='friends-name'>{value.name} </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
}

export default SearchFriendComponent;