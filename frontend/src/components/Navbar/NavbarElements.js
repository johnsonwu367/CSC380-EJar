import styled from 'styled-components'
import { NavLink as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  width:100%;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* @media screen and (max-width: 768px) {
      transition: 0.8s all ease;
  } */
`

// export const NavbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   height: 80px;
//   z-index: 1;
//   width: 100%;
//   padding: 0 24px;
//   max-width: 1100px;
// `

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 1rem;
`

export const NavLink = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  /* padding: 0.5rem 1rem; */
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  /* &.active {
    color: #4b59f7;
  } */
  &.active {
      border-bottom: 3px solid #4b59f7
  }
  @media screen and (max-width: 768px) {
      text-align: center;
      padding: 2rem;
      width: 100%;
      display: table;
      &:hover {
         color: #4b59f7;
         transition: all 0.5s ease;
      }
  }
`

export const MobileIcon = styled.div`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 24px;
  text-align: center;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({click}) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: #101522;
  }
`

export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;
  &:hover {
      border-bottom: 3px solid #4b59f7
  }
  @media screen and (max-width: 768px) {
      width: 100%;
      &:hover {
          border: none;
      }
  }
`

// export const NavBtn = styled.nav`
//   display: flex;
//   align-items: center;
//   margin-right: 24px;
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

export const NavBtnLink = styled(LinkR)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;