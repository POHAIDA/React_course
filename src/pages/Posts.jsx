import React, { useEffect, useRef, useState } from 'react'
import './../styles/App.css'
import PostList from './../components/PostList';
import MyButton from './../components/UI/button/MyButton';
import PostForm from './../components/PostForm';
import PostFilter from './../components/PostFilter';
import MyModal from './../components/UI/MyModal/MyModal';
import { usePosts } from './../hooks/usePosts';
import PostService from './../API/PostService';
import Loader from './../components/UI/Loader/Loader';
import { useFetching } from './../hooks/useFetching';
import { getPageCount } from './../utils/pages';
import Pagination from './../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function Posts() {
  const [posts,setPosts] = useState([]);

  const [filter,setFilter] = useState({sort: '', query: ''});

  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [totalPages, setTotalPages] = useState(0);

  const [limit, setlimit] = useState(10);
  
  const [page, setPage] = useState(1);

  const lastElement = useRef()


  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
      
      setPosts([...posts, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
  })


  useObserver(lastElement,page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })


  useEffect(() => {
    fetchPosts(limit, page)
   }, [page,limit])


   const createPost = (newPost) =>{
    setPosts([...posts,newPost])
    setModal(false)
  }
 
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }


  // useEffect(() => {
  //   const savedPage = localStorage.getItem('currentPage');
  //   if (savedPage) {
  //     setPage(parseInt(savedPage));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('currentPage', page.toString());
  // }, [page]);
 

  

  return(
    <div className='App'>
          <MyButton style={{marginTop:'30px'}} onClick={() => setModal(true)}>
            Create post
          </MyButton>

          <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost}/>
          </MyModal>
        
        
          <PostFilter 
            filter={filter}
            setFilter={setFilter}
          />

          <MySelect
              value={limit}
              onChange={value => setlimit(value)}
              defaultValue='Amount posts'
              options={[
                {value: 5, name: '5'},
                {value: 10, name: '10'},
                {value: 15, name: '15'},
              ]}
          
          
          />

          {postError &&
            <h1>Error {postError}</h1>
          }
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Post list'}/>
          <div ref={lastElement} />

          {isPostsLoading &&
              <div style={{display:'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div> 
          }

          <Pagination 
              page={page} 
              changePage={changePage} 
              totalPages={totalPages}/>
    </div>
) 
}

export default Posts;
