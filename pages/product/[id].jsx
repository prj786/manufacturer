import * as React from 'react';
import { Container, Divider, Grid, Typography } from "@mui/material";
import Logo from '../../components/Logo';
import Navigation from '../../components/Navigation';
import ReactImageZoom from 'react-image-zoom';
import { ProductionQuantityLimitsTwoTone } from '@mui/icons-material';
import Image from 'next/image';
import mainImage from '../../public/images/manu-28.jpg';
import { useRouter } from "next/router";
import { asyncData } from '../../shared/api';

export default function ProductId() {
    const props = { width: 700, height: 700, zoomWidth: 300, scale: 0.4, zoomPosition: 'right', img: "https://picsum.photos/700/700" };
    const router = useRouter();
    const [item, setItemInfo] = React.useState({});
    React.useEffect(() => {
        asyncData(`product/${router.query.id}/details`).then(res => {
            setItemInfo(res);
        })
    }, [])

    return (
        <>
            <Container maxWidth="xl">
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={6} md={6}>
                        {/* {item.imageUrl && (
                            <Image
                                src={item.imageUrl}
                                alt="Picture of the author"
                                placeholder='blur'
                                layout='responsive'
                            />
                        ) */}
                        <Image
                            src={mainImage}
                            alt="Picture of the author"
                            layout='responsive'
                        />
                        {/* } */}
                    </Grid>
                    <br />
                    <Grid item xs={6} md={6} spacing={6} justifyContent={'center'} flexDirection={'column'} gap={'20px'} alignItems={'center'} height={'100%'}>
                        <Typography fontSize={'2rem'} variant='h2'>{item.nameGeo + ' / ' + item.nameEng}</Typography>
                        <br />
                        <br />
                        <Typography fontSize={'1.2rem'} variant='body2'>
                            {item.description}
                        </Typography>
                        <br />
                        <br />
                        <Typography fontSize={'0.9rem'} fontWeight={'bold'}>ავტორი: {item.author}</Typography>
                        <br />
                        <Divider />
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                                <Typography variant='h6' fontWeight={'bolder'} fontSize={'1.2rem'}>ფასი:</Typography>
                                <Typography variant='body1' fontSize={'1.1rem'}>{item.price}₾</Typography>
                            </span>
                            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2px' }}>
                                <Typography variant='h6' fontWeight={'bolder'} fontSize={'1.2rem'}>
                                    <ProductionQuantityLimitsTwoTone></ProductionQuantityLimitsTwoTone>
                                </Typography>
                                <Typography variant='body1' fontSize={'1.2rem'}>{item.quantity}</Typography>
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}