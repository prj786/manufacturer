import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Grid, Typography } from "@mui/material";
import Image from 'next/image';
import mainImage from '../public/images/manu-28.jpg';

export default function Footer() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: 500,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Image
                        src={mainImage}
                        alt="Picture of the author"
                        placeholder='blur'
                        layout='responsive'
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Typography variant="h1" color="initial" fontSize={'2rem'}>
                        Lorem ipsum!
                    </Typography>
                    <Typography variant="body1" color="initial" fontSize={'1.1rem'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nemo aut similique corporis nam nihil necessitatibus eius tempora. Laboriosam ut incidunt voluptate eligendi eaque molestias odio neque dolores excepturi asperiores!
                    </Typography>
                </div>
            </Box>
        </>
    )
}