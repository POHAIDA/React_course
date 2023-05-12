import React, {useState} from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'


const PostForm = ({create}) => {
    const[post,setPost]= useState({title: '', body: ''})

    const addNewPost = (e) => {
      e.preventDefault();
     
      // setPosts([...posts,{...post, id:Date.now()}]);
      const newPost = {
        ...post,id:Date.now()
      }
      create(newPost)
      setPost({title: '', body: ''});
    }
    

  return (
    <form>
      <MyInput 
        value={post.title}
        onChange={event => setPost({...post,title: event.target.value})}
        type="text" 
        placeholder='Post name' 
        />
      
      <MyInput 
        value={post.body}
        onChange={event => setPost({...post,body: event.target.value})}
        type="text" 
        placeholder='Post description'/>
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  )
}

export default PostForm