import About from "../pages/About"
import PostIdPage from "../pages/PostIdPage"
import Posts from "../pages/Posts"
import Login from "../pages/Login"

export const privateRoutes = [
    {path: '/about',element:<About/>,end:true},
    {path: '/posts',element:<Posts/>,end:true},
    {path: '/posts/:id',element:<PostIdPage/>,end:true},
]

export const publicRoutes = [
    {path: '/login', element:<Login/>,end:true}
]