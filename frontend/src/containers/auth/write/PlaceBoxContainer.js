import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaceBox from '../../../components/write/PlaceBox';
import { changeField, writePost } from '../../../_actions/write_actions';

const PlaceBoxContainer = () => {
  const dispatch = useDispatch();
  // const [title, body, place] = useSelector((state) => state.write);
  const place = useSelector((state) => state.write.place);

  const onChangePlace = (place) => {
    dispatch(
      changeField({
        key: 'place',
        value: place,
      }),
    );
  };

  const onWritePost = () => {
    dispatch(writePost({ place }));
  };

  return (
    <PlaceBox
      onChangePlace={onChangePlace}
      place={place}
      writePost={onWritePost}
    ></PlaceBox>
  );
};

export default PlaceBoxContainer;
