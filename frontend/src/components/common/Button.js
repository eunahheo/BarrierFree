import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  // outline: none;
  cursor: pointer;
  color: white;
  background: ${palette.blue[0]};
  &:hover {
    background: white;
    color: ${palette.blue[0]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;

      width: 100%;
      font-size: 1.125rem;
      color: white;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.blue[0]};
      &:hover {
        background: white;
        color: ${palette.blue[0]};
      }
    `}
  ${(props) =>
    props.kakao &&
    css`
      background: yellow;
      color: black;
      &:hover {
        background: white;
        color: black;
      }
    `}

  ${(props) =>
    props.order &&
    css`
      // background: yellow;
      // color: black;
      margin-right: 1.5rem;
      // &:hover {
      //   background: white;
      //   color: black;
      // }
    `}
    ${(props) =>
    props.check &&
    css`
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      // align-items: center;
    `}
`;
const StyledButton = styled.button`
  ${buttonStyle}
`;
const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledButton {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
