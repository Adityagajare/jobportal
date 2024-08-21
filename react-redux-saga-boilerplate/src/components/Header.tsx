import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, responsive, Text } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { loginSuccess, logOut } from '~/actions';

import Logo from '~/components/Logo';
import { useNavigate } from 'react-router-dom';

import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const HeaderWrapper = styled.header`
background-color: #113740;
height: ${headerHeight}px;
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
interface Props {
  role: string;
  name:string;
}

const Header: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickLogout = () => {
    dispatch(logOut());
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <HeaderWrapper data-component-name="Header">
      {dispatch(loginSuccess()) && (
        <Container direction="row" justify="space-between" padding="md">
          <Logo />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-admin">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.3rem' }} />
              <span className="p-3" style={{ fontSize: '1.3rem' }}>
                {' '}
                {props.name}
              </span>{' '}
              {/* User profile icon */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  handleClickLogout();
                }}
              >
                Logout
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/user/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/appliedjobs">
                Appiled Jobs
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      )}
    </HeaderWrapper>
  );
};

export default Header;
