import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCallback, useState, useEffect } from 'react';

const PlaceBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[0]};
  padding-top: 1rem;
`;

const PlaceForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 100%;
  border: 1px solid ${palette.blue[0]};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1.125rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    background: ${palette.blue[0]};
    color: white;
    &:hover {
      background: ${palette.gray[0]};
      color: ${palette.blue[0]};
    }
  }
`;

const PlaceItemBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border-bottom: 1px solid ${palette.gray[0]};
  padding-bottom: 0.5rem;
`;

const PlaceItem = React.memo(({ place, onRemove }) => (
  <div onClick={() => onRemove(place)}>
    <LocationOnIcon />
    {place}
  </div>
));

const PlaceBox = ({ onChangePlace, place, onWritePost }) => {
  const [input, setInput] = useState('');
  const [localPlace, setLocalPlace] = useState([]);

  const insertPlace = useCallback(
    (place) => {
      if (!place.trim()) return;
      if (localPlace === place) return;
      setLocalPlace(place);
      onChangePlace(place);
    },
    [localPlace, onChangePlace],
  );

  const onRemove = useCallback(() => {
    setLocalPlace([]);
    onChangePlace('');
  }, [localPlace, onChangePlace]);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertPlace(input.trim());
      setInput('');
      console.log('장소 등록::', input);
    },
    [input, insertPlace],
  );
  const onClick = () => {
    onWritePost();
  };
  useEffect(() => {
    setLocalPlace(place);
  }, [place]);
  useEffect(() => {
    setLocalPlace([]);
  }, []);
  return (
    <PlaceBoxBlock>
      <div>
        <PlaceForm onSubmit={onSubmit}>
          <input
            placeholder="장소를 입력하세요"
            value={input}
            onChange={onChange}
          />
          <button onClick={onClick}>검색</button>
          {/* <button>검색</button> */}
          {/* <input></input> */}
          {/* <button type="submit">추가</button> */}
        </PlaceForm>
        <PlaceItemBlock>
          <PlaceItem place={localPlace} onRemove={onRemove} />
        </PlaceItemBlock>
      </div>
    </PlaceBoxBlock>
  );
};

export default PlaceBox;
