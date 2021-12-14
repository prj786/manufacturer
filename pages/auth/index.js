import * as React from 'react';
import { Box, Grid, Container, Button, TextField, Typography } from '@mui/material';

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'gray',
    border: 1,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};

export default function Auth() {
    const [login, setLogin] = React.useState(true);

    const form = () => {
        if (!login) {
            return (<>
                <div>
                    <TextField
                        label="მომხმარებელი"
                        type={'text'}
                        placeholder='მომხმარებელი'
                    />
                </div>
                <div>
                    <TextField
                        label="მეილი"
                        type={'email'}
                        placeholder='@'
                    />
                </div>
                <div>
                    <TextField
                        label="პაროლი"
                        type={'password'}
                        placeholder='პაროლი'
                    />
                </div>
                <div>
                    <TextField
                        label="გაიმეორე პაროლი"
                        type={'password'}
                        placeholder='პაროლი'
                    />
                </div>
                <div>
                    <Button variant="outlined">
                        რეგისტრაცია
                    </Button>
                </div>
            </>)
        } else {
            return (<>
                <div>
                    <TextField
                        label="მომხმარებელი"
                        type={'text'}
                        placeholder='მომხმარებელი'
                    />
                </div>
                <div>
                    <TextField
                        label="პაროლი"
                        type={'password'}
                        placeholder='პაროლი'
                    />
                </div>
                <div>
                    <Button variant="outlined">
                        შესვლა
                    </Button>
                </div>
            </>)
        }
    }

    return (
        <>
            <Container maxWidth="xl">
                <Grid container alignContent={{ xs: 'center' }} spacing={{ xs: 4, md: 3 }} columns={{ xs: 2, sm: 8, md: 16 }} gap={'15px'} flexDirection={'column'} height={'500px'} alignItems={'center'} justifyContent={'center'}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            ...commonStyles
                        }}
                        padding={'20px'}
                        marginTop={'30px'}
                        noValidate
                        autoComplete="off"
                    >
                        {
                            form()
                        }
                    </Box>
                    <div>
                        <Button onClick={() => setLogin(!login)}>
                            {!!login ?
                                'დარეგისტრირდი'
                                :
                                'გაიარე ავტორიზაცია'
                            }
                        </Button>
                    </div>
                </Grid>
            </Container>
        </>
    )
}