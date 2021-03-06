import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const PlaceListBlock = styled.div`
  height: 100px;
  position: fixed;

  ${(props) =>
    props.hov &&
    css`
      background: white;
      &:hover {
        background: ${palette.grey[0]};
        color: ${palette.blue[0]};
      }
    `}
`;

export const Place = ({ postLocation, postAddress }) => {
  return (
    <div>
      <hr></hr>
      <h4>{postLocation}</h4>
      <h4>{postAddress}</h4>
      <hr></hr>
    </div>
  );
};

const PlaceList = ({ searchPlaces }) => {
  return (
    <PlaceListBlock>
      {searchPlaces.map((searchPlace) => (
        // <Place
        //   postLocation={searchPlace.postLocation}
        //   postAddress={searchPlace.postAddress}
        //   key={searchPlace.index}
        // ></Place>
        <div>
          <hr></hr>
          <h4>{searchPlace.postLocation}</h4>
          <h4>{searchPlace.postAddress}</h4>
          <hr></hr>
        </div>
      ))}
    </PlaceListBlock>
  );
};

export default PlaceList;
