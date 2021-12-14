import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { ShoppingCart, ProductionQuantityLimits } from '@mui/icons-material';
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import ModalBox from './Modal';


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

export default function Navigation({ auth }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dropdown = function () {
        if (!auth) {
            return (
                <div>
                    <MenuItem onClick={handleOpenModal}>
                        <ListItemIcon>
                            <ProductionQuantityLimits fontSize="small" />
                        </ListItemIcon>
                        პროდუქტის დამატება
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        <Link href={'/auth'}>
                            პაროლის შეცვლა
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <Link href={'/'}>
                            გასვლა
                        </Link>
                    </MenuItem>
                </div>
            )
        } else {
            return (
                <div>
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        <Link href={'/auth'}>
                            რეგისტრაცია / ავტორიზაცია
                        </Link>
                    </MenuItem>
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalBox close={handleCloseModal} addMode={true} />
                </Box>
            </Modal>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'flex-end', alignItems: 'center', height: '100px' }}>
                <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>About Us</Typography>
                <Tooltip title="კალათა">
                    <IconButton size="small" sx={{ ml: 2 }}>
                        <ShoppingCart sx={{ width: 32, height: 32 }}>2</ShoppingCart>
                    </IconButton>
                </Tooltip>
                <Tooltip title="ანგარიში">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    dropdown()
                }
            </Menu>
        </React.Fragment>
    )
}