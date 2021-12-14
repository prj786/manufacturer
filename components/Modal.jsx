import * as React from 'react';
import { Typography } from "@mui/material";
import { Box, Grid, Button, TextField, Select, MenuItem, Input } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ConfirmDialog from './ConfirmDialog';
import { useTheme } from '@mui/material/styles';
import { asyncData, asyncMultipartPostData } from '../shared/api';

const commonStyles = {
    bgcolor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function ModalBox({ addMode, product, close }) {
    const data = {
        ...product,
        images: product?.images ? product.images : [],
        categoryId: product?.categoryId ? product.categoryId : ''
    };
    const [personName, setPersonName] = React.useState([]);
    const [deletePopup, setDelete] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        asyncData('category/search?', 'GET', null, { Search: '', Page: 0, PageSize: 100 })
            .then(data => {
                setCategories(data.records.map(cat => {
                    return {
                        name: cat.nameGeo,
                        id: cat.entityId
                    }
                }));
            })
    }, []);

    const deleteMode = () => {
        if (!addMode) {
            return <Button color="error" variant='contained' onClick={() => setDelete(true)}>პროდუქტის წაშლა</Button>
        }
    }

    const setData = () => {
        if (addMode) {
            asyncData('product', 'POST', data).then((log) => {
                close();
            })
        } else {
            const updatedData = {
                ...data,
                entityID: data.id
            }
            asyncData('product', 'PUT', updatedData).then((log) => {
                close();
            })
        }
        // asyncMultipartPostData('product', data).then(log => console.log(log));
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function confirmedDelete(e) {
        if (e) {
            asyncData(`product/${data.id}`, 'DELETE').then();
            setDelete(false);
            return;
        }
        setDelete(e);
    }

    return (
        <>
            <ConfirmDialog openDialog={deletePopup} removed={(event) => confirmedDelete(event)} text={'ნამდვილად გსურთ პროდუქტის წაშლა?'} textField={'წაშლა'}></ConfirmDialog>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {!addMode ?
                    'პროდუქტის რედაქტირება' :
                    'პროდუქტის დამატება'
                }
            </Typography>
            <Grid container alignContent={{ xs: 'center' }} spacing={{ xs: 4, md: 3 }} columns={{ xs: 2, sm: 8, md: 16 }} gap={'15px'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
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
                    <div style={{maxHeight: '550px', overflow: 'auto'}}>
                        <div>
                            <TextField
                                label="დასახელი (ქარ)"
                                type={'text'}
                                defaultValue={data.nameGeo}
                                onChange={(e) => data.nameGeo = e.target.value}
                            />
                        </div>
                        <div>
                            <TextField
                                label="დასახელება (ინგ)"
                                type={'text'}
                                defaultValue={data.nameEng}
                                onChange={(e) => data.nameEng = e.target.value}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="აღწერა"
                                maxHeight={'300px'}
                                overFlow={'auto'}
                                type={'text'}
                                defaultValue={data.description}
                                onChange={(e) => data.description = e.target.value}
                                multiline
                            />
                        </div>
                        <div>
                            <TextField
                                label="ფასი"
                                type={'number'}
                                defaultValue={data.price}
                                onChange={(e) => data.price = Number(e.target.value)}

                            />
                        </div>
                        <div>
                            <TextField
                                label="რაოდენობა"
                                type={'number'}
                                defaultValue={data.quantity}
                                onChange={(e) => data.quantity = Number(e.target.value)}

                            />
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 225 }}>
                                <InputLabel id="demo-multiple-name-label">კატეგორია</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    defaultValue={data.categoryId}
                                    onChange={(e) => data.categoryId = e.target.value}
                                    input={<OutlinedInput label="კატეგორია" />}
                                    MenuProps={MenuProps}
                                >
                                    {categories.map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            value={item.id}
                                            type='button'
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                label="ავტორი"
                                type={'text'}
                                defaultValue={data.author}
                                onChange={(e) => data.author = e.target.value}
                            />
                        </div>
                        <div>
                            <TextField
                                label="კოდი"
                                type={'text'}
                                defaultValue={data.code}
                                onChange={(e) => data.code = e.target.value}
                            />
                        </div>
                    </div>
                    {/* <div>
                        {
                            data.images.map((item) => {
                                return <span key={item}>{item}</span>
                            })
                        }
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                                data.images.push(e.target.files[0]);
                            }} id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                                სურათის ატვირთვა
                            </Button>
                        </label>
                    </div> */}
                </Box>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button variant="contained" onClick={setData}>
                        {!addMode ?
                            'რედაქტირება'
                            :
                            'დამატება'
                        }
                    </Button>
                    {
                        deleteMode()
                    }
                </div>
            </Grid>
        </>
    )
}