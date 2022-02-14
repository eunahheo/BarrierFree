import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import BarrierIcon from './BarrierIcon';
import LocationIcon from '@mui/icons-material/LocationOn';

function MainCard(post_photo, post_location, post_title, impairment) {
  return (
    <div>
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="300"
          image={post_photo}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            <LocationIcon sx={{ fontSize: 15 }} /> {post_location}
          </Typography>
          {post_title}
          {impairment}
          <BarrierIcon></BarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
}
// function textAxios() {
//   axios(
//     {
//       url: '/post/all',
//       method: 'get',
//       baseURL: 'http://localhost:3000/'
//     }
//   ). then(function (res) {
//     console.log(res.data)
//   })
// }
// const MainCard = () => {
//   const [recommend, setRecommend] = useState([]);
//   useEffect(()=> {
//     axios(
//       {
//         url:'post/all?user_seq=1'
//       }
//     ).then(function (res) {
//       console.log(res.data)
//       console.log(res.data[0])
//       setRecommend(res.data[0].post_location)
//     });
//   })

//   // function testAxios(){
//   //     axios(
//   //         {
//   //           url:'post/all?user_seq=1' // axios 불러오기.. 화이팅..
//   //           // url: '/post/all',
//   //           // method: 'get',
//   //           // params:{
//   //           //   user_seq: 1
//   //           // },
//   //           // baseURL: 'http://localhost:8080',
//   //           //withCredentials: true,
//   //         }
//   //       ).then(function (response) {
//   //         console.log(response.data)
//   //       });

//   return (
//     <div>
//     <Card sx={{ maxWidth: 250 }}>
//       <CardMedia
//         component="img"
//         height="300"
//         image={BeachPicture}
//         alt="Dog Picture"
//       />
//       <CardContent align="left">
//         <Typography variant="body2" color="text.secondary">
//           {recommend}
//         </Typography>
//           영덕에 놀러왔어요 ㅎㅎ
//         <BarrierIcon></BarrierIcon>
//       </CardContent>
//     </Card>
//   </div>

//   );
//   }
export default MainCard;
