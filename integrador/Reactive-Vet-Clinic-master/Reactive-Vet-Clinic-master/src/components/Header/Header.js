//import { useSelector } from "react-redux"
// import { Provider } from "react-redux"
// import store from "../../services/store"
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from '../HeaderNavBar/HeaderNavBar';
  
  const Header = () => {
    //const login = useSelector((state)=>state.login )
    return (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/' activeStyle>
              Home 
            </NavLink>
            <NavLink to='/services' activeStyle>
              Servicios
            </NavLink>
            <NavLink to='/userProfile' activeStyle>
              Perfil
            </NavLink>
            <NavLink to='/register' activeStyle>
              Registrate
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  };
  
  export default Header;