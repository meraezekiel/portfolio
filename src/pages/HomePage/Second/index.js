import { Stack, Typography } from '@mui/material'
import React from 'react'
import './styles.scss'
import profile from '../../../assets/images/profile2.jpg'


export default function Second() {
  return (
    <Stack
      sx={{
        p:5,
        display:'flex',
        flexDirection:'row',
        flex:1
      }}
    >
        <div
            className='img_cont_second'
        >
            <img
                className='img_bg_second'
                src={profile}
            ></img>
        </div>

        <Stack
          sx={{
            flex:1,
            justifyContent:'center'
          }}
        >
          <Stack>
            <Typography
              sx={{
                color:'white',
                fontSize:50,
                fontWeight:700
              }}
            >About <span style={{color:'cyan'}}>Me</span> </Typography>
            
          </Stack>
          <Stack>
            <Typography
              sx={{
                color:'white',
                mt:4,
                mb:4,
                fontSize:25,
                fontWeight:700
              }}
            >
              Full Stack Developer!
            </Typography>
          </Stack>
          <Stack>
            <Typography
              sx={{
                color:'white',
                fontSize:22,
                fontWeight:500
              }}
            >I'm a passionate React developer with over a year and eight months of hands-on experience, proficient in Node.js, Directus, Redux, and Redis. I thrive on tackling complex challenges and delivering high-quality solutions that exceed expectations.</Typography>
          </Stack>

          <Stack
            className='moreaboutme'
          >
            <Typography
              sx={{
                fontWeight:600,
                fontSize:16
              }}
            >More About Me</Typography>
          </Stack>
        </Stack>

        
    </Stack>
  )
}
