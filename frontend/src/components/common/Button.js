import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  // outline: none;
  cursor: pointer;

  background: white;
  &:hover {
    background: black;
    color: white;
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
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
