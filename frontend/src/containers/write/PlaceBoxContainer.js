import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaceBox from '../../components/write/PlaceBox';
import { changeField, writePost } from '../../_actions/write_actions';
import { useCallback } from 'react';

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

  const onChangeField = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  return (
    <PlaceBox
      onChangePlace={onChangePlace}
      postLocation={postLocation}
      onChangeField={onChangeField}
    ></PlaceBox>
  );
};

export default PlaceBoxContainer;
