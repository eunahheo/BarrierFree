import WriteBarrierIcon from '../../components/write/WriteBarrierIcon';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, clickField } from '../../_actions/write_actions';
import { useCallback } from 'react';

const WriteBarrierIconContainer = () => {
  const dispatch = useDispatch();
  const { deaf, infant, physical, senior, visibility } = useSelector(
    ({ write }) => ({
      deaf: write.deaf,
      infant: write.infant,
      physical: write.physical,
      senior: write.senior,
      visibility: write.visibility,
    }),
  );
  const onClickField = useCallback(
    (payload) => {
      dispatch(clickField(payload));
    },
    [dispatch],
  );
  const onChangeField = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );
  return (
    <WriteBarrierIcon
      onClickField={onClickField}
      deaf={deaf}
      infant={infant}
      physical={physical}
      senior={senior}
      visibility={visibility}
      onChangeField={onChangeField}
    ></WriteBarrierIcon>
  );
};

export default WriteBarrierIconContainer;
