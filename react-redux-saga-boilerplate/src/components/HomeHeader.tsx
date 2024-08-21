import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, responsive, Text } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { loginSuccess, logOut } from '~/actions';

import Logo from '~/components/Logo';

const HeaderWrapper = styled.header`
  background-color: #113740;
  height: 74px;
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

const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  height: 100%;
  padding: 0;
  flex-grow: 1;
  justify-content: center;
  align-items: center; /* Center align items vertically */
  text-align: center; /* Center align text */

  li {
    margin: 0 15px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    padding: 10px; /* Add padding to increase clickable area */

    ${responsive({ lg: { fontSize: '16px' } })};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 14px;

  ${responsive({ lg: { fontSize: '16px' } })};

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`;

export default function HomeHeader() {
  const dispatch = useDispatch();

  //   const handleClickLogout = () => {
  //     dispatch(logOut());
  //   };

  return (
    <HeaderWrapper data-component-name="Header">
      <Container direction="row" justify="space-between" padding="md">
        <Logo />
        <nav>
          <NavbarList>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/Page">Page</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Log In</a>
            </li>
          </NavbarList>
        </nav>
        {/* <Logout data-component-name="Logout" onClick={handleClickLogout}>
            <Text>login</Text>
            <Icon ml="xs" name="sign-out" />
          </Logout> */}
      </Container>
    </HeaderWrapper>
  );
}
