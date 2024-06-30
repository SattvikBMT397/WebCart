// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cards from './Cards'
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Header from './Header';
// import { CircularProgress } from '@mui/material';


// function Display() {
//   const [cardData, setCardData] = useState([]);
//   const [loading,setLoading]=useState(true);

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products/')
//       .then((res) => {
//         // console.log(res.data);
//         setCardData(res.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   if(loading){
//     return (
//       <>
//       <Box sx={{display:'flex',justifycontent:'center', alignItem:'center',height:'100vh'}}>
//           <CircularProgress />
//           Waiting
//       </Box>
//       </>
//     )
//   }

//   return (
//     <>

//     <Header/>
//       <Grid container spacing={2} justifyContent="center">
//       {cardData.map((item) => (
//         <Grid item key={item.id}>
//           <Cards item={item} />
//         </Grid>
//       ))}
//     </Grid>
//     </>
//   );
// }

// export default Display;
// src/components/Display.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from './Header';
import { CircularProgress } from '@mui/material';
import { Item } from '../utilise/interface';

const Display: React.FC = () => {
  const [cardData, setCardData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Item[]>('https://fakestoreapi.com/products/')
      .then((res) => {
        setCardData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        Waiting
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Grid container spacing={2} justifyContent="center">
        {cardData.map((item) => (
          <Grid item key={item.id}>
            <Cards item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Display;

