import styled from 'styled-components';
import './tempbutton.css';
import palette from '../lib/styles/palette';

const ButtonGroupBlock = styled.div`
  .html {
    height: 100%;
  }
  // .body {
  //   height: 100%;
  // }
  // border: none;
  // border-radius: 4px;
  // font-size: 1rem;
  // padding: 0.25rem 1rem;
  // outline: none;
  // cursor: pointer;
  // color: white;
  // transition: 800ms ease all;
  // background: ${palette.blue[0]};
  // &:hover {
  //   background: white;
  //   color: ${palette.blue[0]};
  // }
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #1aab8a;
    transition: 400ms ease all;
  }
  &::after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  &:hover {
    &::before {
      width: 100%;
      transition: 800ms ease all;
    }
  }
  &:hover {
    &::after {
      width: 100%;
      transition: 800ms ease all;
    }
  }
`;

const ButtonGroup = () => {
  return <ButtonGroup></ButtonGroup>;
};
export default ButtonGroup;
