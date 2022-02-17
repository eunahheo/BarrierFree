import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelect } from '@mui/base';
import { styled } from '@mui/system';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigate } from '../../../node_modules/react-router/index';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Root = styled('div')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  position: relative;
  display: inline-block;
  vertical-align: baseline;
  color: #000;
`;

const Toggle = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 100px;
  background: var(--color, ${
    theme.palette.mode === 'dark' ? grey[900] : '#fff'
  });
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
  };
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  & .placeholder {
    opacity: 0.8;
  }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 5px 0 0 0;
  list-style: none;
  position: absolute;
  height: auto;
  transition: opacity 0.1s ease;
  min-width: 320px;
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
  };
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  z-index: 1;
  outline: 0px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end;
  }

  & > li {
    padding: 8px;
    border-radius: 0.45em;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    }

    &[aria-selected='true'] {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    }
  }
  `,
);

function CustomSelect({ options }) {
  const user = useSelector((state) => state.user.userData);
  const [alarm, setAlarm] = React.useState([]);
  const listboxRef = React.useRef(null);
  const [listboxVisible, setListboxVisible] = React.useState(false);
  const { getButtonProps, getListboxProps, value } = useSelect({
    listboxRef,
    options,
  });
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const updateAlarm = setInterval(() => {
  //     axios({
  //       method: 'get',
  //       url: '/alarm/all',
  //       params: { userSeq: user.userSeq },
  //     }).then((res) => {
  //       options.length = 0;
  //       console.log(res);
  //       for (var i = 0; i < res.data.length; i++) {
  //         console.log(i + '번째 : ' + res.data[i]);
  //         if (res.data[i].alarm.alarmType == '0') {
  //           options.push({
  //             label: res.data[i].userNickname + '님이 당신을 팔로우합니다!',
  //             value: `/user/` + res.data[i].alarm.alarmData,
  //             alarmSeq: res.data[i].alarm.alarmSeq,
  //           });
  //         } else if (res.data[i].alarm.alarmType == '1') {
  //           options.push({
  //             label:
  //               res.data[i].userNickname +
  //               '님이 당신의 게시글을 스크랩했습니다!',
  //             value: `/post/detail/` + res.data[i].alarm.alarmData,
  //             alarmSeq: res.data[i].alarm.alarmSeq,
  //           });
  //         } else {
  //           options.push({
  //             label: res.data[i].userNickname + '님이 댓글을 작성했습니다.',
  //             value: `/post/detail/` + res.data[i].alarm.alarmData,
  //             alarmSeq: res.data[i].alarm.alarmSeq,
  //           });
  //         }
  //       }
  //       console.log(options);
  //       setAlarm(options);
  //     });
  //   }, 1000);
  // }, []);

  const onClick = (value) => {
    navigate(value);
  };

  return (
    <Root onClick={() => setListboxVisible(!listboxVisible)}>
      <Badge badgeContent={alarm.length} color="primary">
        <MailIcon color="action" />
      </Badge>

      <Listbox
        {...getListboxProps()}
        className={listboxVisible ? '' : 'hidden'}
      >
        {alarm.map((option) => (
          <li key={option}>
            <a
              style={{ display: 'block', cursor: 'pointer' }}
              onClick={function () {
                axios({
                  method: 'put',
                  url: '/alarm/check',
                  params: { userSeq: user.userSeq, alarmSeq: option.alarmSeq },
                });
                navigate(option.value);
              }}
            >
              {option.label}
            </a>
          </li>
        ))}
      </Listbox>
    </Root>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.node,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
};

const options = [];

export default function UseSelect() {
  return <CustomSelect placeholder="Select a color..." options={options} />;
}
