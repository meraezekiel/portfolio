import { Stack, Typography } from '@mui/material';
import React from 'react';
import "./styles.scss";

export default function Header() {

    const headerchoice = ["home","about","services","skills","project","contact"]
  return (
   <section
     id='component_header'
   >
        <Stack
          className='cont_header'
        >
            <Stack
                sx={{
                    justifyContent:'center',
                    display:'flex',
                    height: 88,
                    flex:1
                }}
            >
                <Typography
                    sx={{
                        fontSize:18,
                        fontWeight:'700',
                        color:'#fff'
                    }}
                >Portfolio</Typography>
            </Stack>

            <Stack
                sx={{
                    display:'flex',
                    height: 88,
                    flexDirection:"row",
                    alignItems:'center',
                    gap :10,
                    flex:1
                }}
            >
                {
                    headerchoice.map((item, index)=>{
                        return (
                            <Typography
                                className="animate-slide-bottom"
                                key={index}
                                sx={{
                                    fontSize:18,
                                    fontWeight:'700',
                                    color:'#fff',
                                    textTransform:'capitalize',
                                    cursor:'pointer',
                                    '&:hover': {
                                        color: 'cyan', 
                                    },
                                }}
                            >{item}</Typography>
                        )
                    })
                }
            </Stack>
        </Stack>
   </section>
  )
}
