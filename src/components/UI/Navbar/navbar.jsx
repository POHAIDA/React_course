import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../button/MyButton'
import { AuthContext } from '../../../context'
import navbar from './Navbar.module.css'

const Navbar = () => {
  const {isAuth,setIsAuth} = useContext(AuthContext)

  const logout = () =>{
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

  return (
  <div className='navbar'>
    <MyButton onClick = {logout}>
      Exit
    </MyButton>
    <div className="navbar__links">
      <MyButton><Link className={navbar.link} to="/about">about</Link></MyButton> 
      <MyButton><Link className={navbar.link} to="/posts">posts</Link></MyButton> 
    </div>
</div>
  )
}

export default Navbar