import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'

const PostIdPage = () => {

const params = useParams()

const [post, setPost] = useState({});

const [comments,setComments] = useState([])

const[fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
})

const[fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsById(id)
    setComments(response.data)
})

useEffect(() =>{
    fetchPostById(params.id)
    fetchComments(params.id)
},[])

  return (
    <div>
        <h1>page is user ID = {params.id} </h1>
        {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title} <br /><br /> {post.body}</div>
        }

        <h1>
            Comments
        </h1>
        {isComLoading
            ? <Loader/>
            : <div>
                {comments.map(comm =>
                    <div key={comm.id} style={{marginTop: 15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
            }
    </div>
);
};

export default PostIdPage