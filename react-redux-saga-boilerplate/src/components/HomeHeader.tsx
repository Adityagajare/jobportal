// import { useDispatch } from 'react-redux';
// import styled from '@emotion/styled';
// import { Container, Icon, responsive, Text } from '@gilbarbara/components';

// import { appColor, headerHeight } from '~/modules/theme';

// import { loginSuccess, logOut } from '~/actions';

// import Logo from '~/components/Logo';
// import { Link } from 'react-router-dom';
// const HeaderWrapper = styled.header`
//   background-color: #113740;
//   height: 74px;
//   left: 0;
//   position: fixed;
//   right: 0;
//   top: 0;
//   z-index: 200;

//   &:before {
//     background-color: ${appColor};
//     bottom: 0;
//     content: '';
//     height: 2px;
//     left: 0;
//     position: absolute;
//     right: 0;
//   }
// `;

// const NavbarList = styled.ul`
//   display: flex;
//   list-style: none;
//   margin: 0;
//   height: 100%;
//   padding: 0;
//   flex-grow: 1;
//   justify-content: center;
//   align-items: center; /* Center align items vertically */
//   text-align: center; /* Center align text */

//   li {
//     margin: 0 15px;
//   }

//   a {
//     color: #fff;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 10px; /* Add padding to increase clickable area */

//     ${responsive({ lg: { fontSize: '16px' } })};

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const Logout = styled.button`
//   align-items: center;
//   color: #fff;
//   display: flex;
//   font-size: 14px;

//   ${responsive({ lg: { fontSize: '16px' } })};

//   span {
//     display: inline-block;
//     text-transform: uppercase;
//   }
// `;

// export default function HomeHeader() {
//   const dispatch = useDispatch();

//   //   const handleClickLogout = () => {
//   //     dispatch(logOut());
//   //   };

//   return (
//     <HeaderWrapper data-component-name="Header">
//       <Container direction="row" justify="space-between" padding="md">
//         <Logo />
//         <nav>
//           <NavbarList>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/services">Services</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//             <li>
//               <Link to="/Page">Page</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//             <li>
//               <Link to="/login">Log In</Link>
//             </li>
//           </NavbarList>
//         </nav>
//         {/* <Logout data-component-name="Logout" onClick={handleClickLogout}>
//             <Text>login</Text>
//             <Icon ml="xs" name="sign-out" />
//           </Logout> */}
//       </Container>
//     </HeaderWrapper>
//   );
// }






import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // For handling Link with Bootstrap
import { Link } from 'react-router-dom';

import { appColor } from '~/modules/theme';
import Logo from '~/components/Logo';

const HeaderWrapper = styled.header`
  background-color: #212529;
  height: 54px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;

  &:before {
    background-color: ${appColor};
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

export default function HomeHeader() {
  const dispatch = useDispatch();

  return (
    <HeaderWrapper data-component-name="Header">
      <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
        <Container>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/services">
                <Nav.Link>Services</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/page">
                <Nav.Link>Page</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderWrapper>
  );
}
