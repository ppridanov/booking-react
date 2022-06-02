import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, TextField, FormGroup, Typography } from '@mui/material';
import { formatDate, getUniquesDates, sendData } from '../../../helpers/helpers';
import { mainUrl } from '../../../helpers/variables';
import ReactInputMask from 'react-input-mask';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': {
        maxWidth: "470px"
    },
    '& .MuiDialogActions-root': {
        justifyContent: "space-between"
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
        </DialogTitle>
    );
};

export default function BookForm(props) {
    const { bookingData } = props;

    const [isError, setIsError] = React.useState(true);
    const [messageError, setMessageError] = React.useState('');
    const [disabled, setIsDisabled] = React.useState(false);
    const [formData, setFormData] = React.useState({
        arrival_date: formatDate(bookingData.start, 'yyyy-MM-dd'),
        departure_date: formatDate(bookingData.end, 'yyyy-MM-dd'),
        senior: '',
        phone: '',
        email: '',
        people: bookingData.peoples,
        number: bookingData.houseId,
        month: +new Date(bookingData.start).getMonth() + 1,
        year: new Date(bookingData.start).getFullYear(),
        unique_keys: getUniquesDates(Date.parse(bookingData.start), Date.parse(bookingData.end))
    });
    const handlerOnChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlerOnSubmitForm = (e) => {
        e.preventDefault(e);
        setIsError(false);
        setIsDisabled(true);
        sendData({
            url: `${mainUrl}/bookhouse.php`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: { ...formData }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Something wrong: ${res.status}`)
        })
            .then(data => {
                if (data.status === "ok") {
                    setMessageError('');
                    return window.location.href = data.refer;
                } else {
                    setIsError(true);
                    setIsDisabled(false);
                    if (data.mess) {
                        setMessageError(data.mess);
                    }
                }
            })
            .catch(err => {
                setIsError(true);
                setIsDisabled(false);
            });
    }
    return (
        <div>
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Бронирование номера
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        autoComplete="off"
                        onSubmit={handlerOnSubmitForm}
                    >
                        <div>
                            <FormGroup row>
                                <TextField
                                    required
                                    label="Дата заезда"
                                    type="date"
                                    disabled
                                    style={{ width: "100%" }}
                                    value={formData.arrival_date}
                                />
                                <TextField
                                    required
                                    disabled
                                    label="Дата выезда"
                                    type="date"
                                    style={{ width: "100%" }}
                                    value={formData.departure_date}
                                />
                            </FormGroup>
                            <FormGroup row>
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="ФИО"
                                    type="text"
                                    style={{ width: "100%" }}
                                    value={formData.senior}
                                    onChange={handlerOnChangeInput}
                                    name="senior"
                                />
                                <ReactInputMask style={{ width: "100%" }} mask="+7 999 999 99 99" required value={formData.phone} onChange={handlerOnChangeInput} children={
                                    <TextField
                                        label="Телефон"
                                        name="phone"
                                        fullWidth
                                    />
                                } />
                                <TextField
                                    id="outlined-number"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    required
                                    style={{ width: "100%" }}
                                />
                            </FormGroup>
                            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
                                <Button disabled={disabled} size='large' type="submit" id='sendForm' variant='contained'>Отправить</Button>
                            </FormGroup>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {isError && <Typography variant='caption' style={{ color: 'red', padding: "0 10px", width: "75%", fontSize: "10px" }}>{messageError ? messageError : 'Произошла ошибка. Попробуйте повторить снова или обратитесь к администратору'}</Typography>}
                    <Button size='large' type="click" onClick={props.handleClose} variant='outlined'>Закрыть</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
