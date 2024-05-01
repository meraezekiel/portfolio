import { Stack, Typography } from '@mui/material'
import React from 'react'
import Typed from 'typed.js';
import { Header } from '../../components'
import First from './First';
import Second from './Second';
import "./styles.scss"

function HomePage() {

  return (
    <Stack
        id='homepage_main'
    >
        <Stack
            sx={{
                backgroundColor:'#010a32',
                flex:1,
            }}
        >
            <Stack
                className='my_header'
            >
                <Header/>
            </Stack>
        </Stack> 
       

        <Stack
            sx={{
                flex:1, 
                display:'flex',
                gap:20
            }}
        >
            <Stack
                className='my_container'
                sx={{
                    // height:'100vh'
                }}
            >
            
                <Stack  className='desc'>
                    <First
                        string={['React Native Developer', 'React Js Developer', 'Full Stack Developer']}
                    />

                </Stack>
                
            </Stack>

            <Stack
                className='my_container'
                sx={{
                    // height:'100vh'
                }}
            >

                <Second/>
                
            </Stack>
        </Stack>


    </Stack>
  )
}

export default HomePage