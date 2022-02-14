import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profileUploadContainer'>
        <div className='uploadDiv'>
      <NavLink className='upload button' to="/upload">Upload</NavLink>
        </div>
        <div className='profileButtonContainer'>
      <ProfileButton className='profileButton' user={sessionUser} />
      </div>

      </div>
    );
  } else {
    sessionLinks = (
      <div className='loginSignupContainer'>
        {/* <div className='loginButton'> */}
        <NavLink className='loginText button' to="/login">Log In</NavLink>
      {/* </div> */}
      {/* <div className='signupButton'> */}
        <NavLink className={'signupText button'} to="/signup">Sign Up</NavLink>
        {/* </div> */}
      </div>
    );
  }

  return (
    //div className='navigationContainerContainer'>
    <div className='navigationContainer'>
    <ul className='navigation'>
      <li>
        <NavLink className='homeButton button' exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
    //</div>
  );
}

export default Navigation;
