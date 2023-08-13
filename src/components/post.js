import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PostComponent = () => {
    const baseURL = "http://localhost:4000/api";

    const [postList, setPostList] = useState([]);
    const [postMessage, updatePostMessage] = useState({
        message: "",
        id: 0,
        like: 0,
        comments: [],
        image: ""
    });
    const [commentText, updateCommentText] = useState("");

    useEffect(() => {
        loadPost();
    }, []);

    const loadPost = () => {
        const url = baseURL+ "/list/post";

        axios.get(url)
            .then((response) => {
                setPostList(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const updatePost = (listOfPost) => {
        const url = baseURL+ "/update/post";
        axios.post(url, listOfPost)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                console.error(error);
            })

    }

    const handlePostText = (event) => {
        updatePostMessage({ ...postMessage, [event.target.name]: event.target.value })
    }

    const createPost = () => {
        postMessage.id = postList.length;
        setPostList([postMessage, ...postList]);
        updatePost([postMessage, ...postList]);
    }

    const deletePostMessage = (post) => {
        const index = postList.findIndex((value) => {
            return value.id === post.id
        })
        postList.splice(index, 1);
        setPostList([...postList]);
        updatePost([...postList]);
    }

    const postLike = (post) => {
        post.like++;
        const index = postList.findIndex((value) => {
            return value.id === post.id;
        })
        postList[index] = post;
        setPostList([...postList]);
        updatePost([...postList]);
    }

    const handlePostComments = (event) => {
        updateCommentText(event.target.value);
    }

    const postComments = (post) => {
        post.comments = [...post.comments, commentText];

        const index = postList.findIndex((value) => {
            return value.id === post.id;
        })
        postList[index] = post;
        setPostList([...postList]);
        updatePost([...postList]);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                updatePostMessage({ ...postMessage, image: event.target.result });
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='middle-content'>
            <div className='postbox-container'>
                <textarea name="message" className='post-data-box' onChange={handlePostText} placeholder='Share your Post'></textarea>
                <div className='post-image-section'>
                    <label>Upload Image</label>
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={() => createPost()}>Create Post</button>
                </div>

            </div>
            <div className='post-content-container'>
                {
                    postList.map((value, index) => {
                        return (
                            <div key={index} className='content-container'>
                                <img src={value.image} alt='' className='image-content-box' />
                                <div className='post-content-box'>
                                    <p className='post-message'>{value.message}</p>
                                    <div className='post-message-contents'>
                                        <img src={require("../images/like-icon.jpg")} className='post-like-icon'
                                            onClick={() => postLike(value)} alt=''/>
                                        <span>Likes: {value.like}</span>
                                        <input type="text" name={`comments${index}`} placeholder='Type your comments here' onChange={handlePostComments} className='comment-input' />
                                        <button onClick={() => postComments(value)}>Add Comment</button>
                                        <img src={require("../images/delete.png")} onClick={() => deletePostMessage(value)} className='post-delete-icon' alt=''/>
                                    </div>

                                    <ol>
                                        {
                                            value.comments.map((comment, cindex) => {
                                                return (
                                                    <li key={cindex}>{comment}</li>
                                                )
                                            })
                                        }
                                    </ol>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default PostComponent;