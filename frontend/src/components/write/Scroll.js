import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function ScrollPlayground() {
  const [searchPlaces, setSearchPlaces] = useState('');
  const [postLocations, setPostLocations] = useState('');
  const [postAddresses, setPostAddresses] = useState([]);
  useEffect(() => {
    const onCl = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/post/searchLocation',
          params: { postLocation: '대구' },
        });
        // console.log(response.data);
        setSearchPlaces(response.data);
      } catch (e) {
        console.log(e.response.data);
        // fail로 반환
        // 여기서 카카오 지도 검색으로 넘어가도록 함
      }
    };
    onCl();
    // console.log('searh', searchPlaces[0]);
    for (const key in searchPlaces) {
      // console.log(key, searchPlaces[key].postLocation);
      setPostLocations([postLocations.concat({ id: key })]);
    }
    console.log(postLocations);
  }, []);

  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
