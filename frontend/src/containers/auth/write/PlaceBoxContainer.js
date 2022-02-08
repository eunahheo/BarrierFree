import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaceBox from '../../../components/write/PlaceBox';
import { changeField, writePost } from '../../../_actions/write_actions';

const PlaceBoxContainer = () => {
  const dispatch = useDispatch();
  // const [title, body, place] = useSelector((state) => state.write);
  const postLocation = useSelector((state) => state.write.postLocation);

  const onChangePlace = (postLocation) => {
    dispatch(
      changeField({
        key: 'postLocation',
        value: postLocation,
      }),
    );
  };

  return (
    <PlaceBox
      onChangePlace={onChangePlace}
      postLocation={postLocation}
    ></PlaceBox>
  );
};

export default PlaceBoxContainer;
