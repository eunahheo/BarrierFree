import WriteBarrierIcon from '../../components/write/WriteBarrierIcon';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, clickField } from '../../_actions/write_actions';
import { useCallback } from 'react';
import write from '../../_reducers/write_reducer';

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
  const impairment = useSelector((state) => state.write.impairment);
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
      onChangeField={onChangeField}
      deaf={deaf}
      infant={infant}
      physical={physical}
      senior={senior}
      visibility={visibility}
      impairment={impairment}
    ></WriteBarrierIcon>
  );
};

export default WriteBarrierIconContainer;
