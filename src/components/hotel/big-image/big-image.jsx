import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import styles from "./big-image.module.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: 0,
        overflow: "hidden",
        display: "flex"
    },
    '& .MuiPaper-root': {
        maxWidth: "100%",
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 0,
                        color: () => "white",
                    }}
                >
                    <CloseIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function CustomizedDialogs(props) {
    return (
        <div>
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}></BootstrapDialogTitle>
                <DialogContent>
                    <img className={styles.image} src={props.image} alt="bigImage" />
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
