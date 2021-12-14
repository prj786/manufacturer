import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Link from 'next/link';
import ModalBox from './Modal';
import { ShoppingCart, ProductionQuantityLimits } from '@mui/icons-material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

{/* "nameGeo": "string",
  "nameEng": "string",
  "price": 0,
  "description": "string",
  "code": "string",
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "author": "string",
  "quantity": 0 */}

export default function CardBox({ nameGeo, nameEng, price, description, code, author, quantity, imgSrc, id, categoryId, images, getData }) {
    const [expanded, setExpanded] = React.useState(false);
    const [openModal, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        console.log(openModal);
        getData();
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }} style={{ cursor: 'pointer' }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={handleOpen}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nameGeo}
                subheader={nameEng}
            />
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalBox close={handleClose} product={{ nameGeo, nameEng, price, description, code, author, quantity, id, categoryId, images }} />
                </Box>
            </Modal>
            <Link href={{
                pathname: '/product/[id]',
                query: { id },
            }}>
                <div>
                    <CardMedia
                        component="img"
                        height="194"
                        image={imgSrc}
                        alt={nameGeo}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {description.substring(0, 120)}
                        </Typography>
                    </CardContent>
                </div>
            </Link>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <ShoppingCart />
                </IconButton>
                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore> */}
            </CardActions>
        </Card>
    );
}