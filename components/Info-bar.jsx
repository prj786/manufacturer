import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import mainImage from '../public/images/manu-33.jpg';

export default function InfoBar() {
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
                <Typography style={{flex: 1}} variant="body1" color="initial" fontSize={'1.6rem'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nemo aut similique corporis nam nihil necessitatibus eius tempora. Laboriosam ut incidunt voluptate eligendi eaque molestias odio neque dolores excepturi asperiores!
                </Typography>
                <div style={{flex: 1, position: 'relative'}}>
                    <Image
                        src={mainImage}
                        alt="Picture of the author"
                        placeholder='blur'
                        layout='responsive'
                    />
                </div>
            </Box>
        </>
    )
}