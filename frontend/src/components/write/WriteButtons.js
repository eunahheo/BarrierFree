import Button from '../common/Button';
import styled from 'styled-components';

const WriteButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 1rem;
  }
`;
const WriteButtons = () => {
  return (
    <WriteButtonsBlock>
      <StyledButton>등록</StyledButton>
      <StyledButton>취소</StyledButton>
    </WriteButtonsBlock>
  );
};

export default WriteButtons;
