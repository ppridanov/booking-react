import React from 'react';
import styles from './hotel.module.css';
import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import 'swiper/css';
import Slider from './slider/slider';

import { getSumm, isObjectNotEmpty, sendData } from '../../helpers/helpers';
import { mainUrl } from '../../helpers/variables';

import BookForm from './form/book-form';
import ruLocale from 'date-fns/locale/ru';

import { useSelector } from 'react-redux';

import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import BigImage from './big-image/big-image';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AirIcon from '@mui/icons-material/Air';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import TvSharpIcon from '@mui/icons-material/TvSharp';

function Hotel() {
    const { houseId } = useParams();
    const { startDate, endDate } = useSelector(state => state.findHouses)
    const [data, setData] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imgModalIsOpen, setImgModalIsOpen] = useState({ open: false, imgSrc: '' });
    const [startBookingDate, setStartDate] = useState(startDate);
    const [disabledButton, setDisabledButton] = useState(false);
    const [endBookingDate, setEndDate] = useState(endDate);
    const [peoplesCount, setPeoplesCount] = useState(1);
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.up("lg"));
    const sm = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        sendData({
            url: `${mainUrl}/houseget.php?id=${houseId}`,
            method: 'GET',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Something wrong: ${res.status}`)
            })
            .then(data => {
                setIsLoading(false);
                setIsError(false);
                setData(data);
            })
            .catch((err) => {
                setIsError(true);
                setIsLoading(false);
                console.log(err)
            });
    }, [houseId])

    const handleOpenModal = (e) => {
        setModalIsOpen(true);
    }

    const handleCloseModal = (e) => {
        setModalIsOpen(false);
    }

    const handleOpenImgModal = (imgSrc) => {
        setImgModalIsOpen({
            imgSrc: imgSrc,
            open: true
        });
    }

    const handleCloseImgModal = (e) => {
        e.preventDefault();
        setImgModalIsOpen({
            imgSrc: '',
            open: false
        });
    }

    const handleError = (bool) => {
        if (bool) setDisabledButton(true);
        else setDisabledButton(false);
    }


    const handlerOnSubmitForm = (event) => {
        event.preventDefault();
        handleOpenModal(true);
    }
    return (
        <>
            {isLoading && <Typography textAlign={"center"} variant={large ? 'h5' : 'h6'}>Загрузка...</Typography>}
            {isError && (
                <Box textAlign={"center"}>
                    <Typography mb={2} variant={large ? 'h5' : 'h6'}>Ошибка... Обратитесь к администратору</Typography>
                    <Button variant={'contained'} onClick={(e) => window.location.reload()}>Перезагрузить страницу</Button>
                </Box>
            )}
            {(isObjectNotEmpty(data)) && (
                <section className={styles.book}>
                    <div className={`${styles.top} ${styles.content}`}>
                        <div className={styles.content__left}>
                            <Slider images={data.images} openModal={handleOpenImgModal} />
                        </div>
                        <Box p={3} sx={{ boxShadow: 3 }} mb={large ? 0 : 2}>
                            <Typography variant={large ? 'h5' : 'h6'} textAlign="center" mb={3}>Цена: {data?.prices ? getSumm([startBookingDate, endBookingDate], data.prices) : 0} р.</Typography>
                            <form className={`form ${styles.form}`} onSubmit={handlerOnSubmitForm} autoComplete="off">
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                                    {sm ? (
                                        <MobileDatePicker
                                            PopperProps={{
                                                className: styles.desktopView,
                                            }}
                                            disableMaskedInput
                                            label={'Заезд'}
                                            value={startBookingDate}
                                            onChange={(date) => {
                                                setStartDate(date)
                                            }}
                                            onError={(event) => { handleError(event); }}
                                            className="custom-date-input"
                                            inputFormat={'dd MMM yyyy'}
                                            minDate={startBookingDate}
                                            renderInput={(params) => <><TextField fullWidth {...params} /><Box mb={2} /></>}
                                        />
                                    ) : (
                                        <DatePicker
                                            disableMaskedInput
                                            label={'Заезд'}
                                            value={startBookingDate}
                                            onChange={(date) => {
                                                setStartDate(date)
                                            }}
                                            onError={(event) => { handleError(event); }}
                                            className={'wtf'}
                                            inputFormat={'dd MMM yyyy'}
                                            minDate={startDate}
                                            renderInput={(params) => <><TextField {...params} /><Box mb={2} /></>}
                                        />
                                    )}
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                                    {sm ? (
                                        <MobileDatePicker
                                            PopperProps={{
                                                className: styles.desktopView,
                                            }}
                                            onError={(event) => { handleError(event); }}
                                            disableMaskedInput
                                            label={'Выезд'}
                                            value={endBookingDate}
                                            onChange={(date) => {
                                                setEndDate(date)
                                            }}
                                            className="custom-date-input"
                                            inputFormat={'dd MMM yyyy'}
                                            minDate={startBookingDate}
                                            renderInput={(params) => <><TextField fullWidth {...params} /><Box mb={2} /></>}
                                        />
                                    ) : (
                                        <DatePicker
                                            disableMaskedInput
                                            label={'Выезд'}
                                            value={endBookingDate}
                                            onChange={(date) => {
                                                setEndDate(date)
                                            }}
                                            onError={(event) => { handleError(event); }}
                                            className="custom-date-input"
                                            inputFormat={'dd MMM yyyy'}
                                            minDate={startBookingDate}
                                            renderInput={(params) => <><TextField {...params} /><Box mb={2} /></>}
                                        />
                                    )}

                                </LocalizationProvider>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Количество человек</InputLabel>
                                    <Select
                                        defaultValue={peoplesCount}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={peoplesCount}
                                        label="Количество человек"
                                        onChange={(e) => setPeoplesCount(e.target.value)}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>

                                    </Select>
                                </FormControl>
                                <Typography variant={large ? 'h5' : 'h6'} textAlign={"center"} mt={1} mb={1}>Предоплата: {data?.prices ? (getSumm([startBookingDate, endBookingDate], data.prices) / 2) : 0}</Typography>
                                <Button disabled={disabledButton} type="submit" fullWidth variant='contained'>Бронировать</Button>
                            </form>
                            <Box mt={2}>
                                <Button component={RouterLink} fullWidth variant={'outlined'} to={'/'}><KeyboardBackspaceIcon /></Button>
                            </Box>
                        </Box>
                    </div>
                    <Box mt={3}>
                        {(data?.is_cond === "1" || data?.is_mang === "1" || data?.is_tv === "1" || data?.is_wifi === "1") && (
                            <Typography variant={large ? "h4" : "h5"} className={styles.descriptionTitle}>Удобства</Typography>
                        )}
                        <Divider></Divider>
                        <div className={`${styles.icons}`}>
                            {data?.is_cond === "1" && (
                                <Box>
                                    <Tooltip title="Есть кондиционер" arrow enterTouchDelay={0}>
                                        <IconButton color='inherit'>
                                            <AirIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                            {data?.is_mang === "1" && (
                                <Box>
                                    <Tooltip title="Есть мангал" arrow enterTouchDelay={0}>
                                        <IconButton color='inherit'>
                                            <OutdoorGrillIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                            {data?.is_wifi === "1" && (
                                <Box>
                                    <Tooltip title="Есть Wi-Fi" arrow enterTouchDelay={0}>
                                        <IconButton color='inherit'>
                                            <SignalWifi4BarIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                            {data?.is_tv === "1" && (
                                <Box>
                                    <Tooltip title="Есть телевизор" arrow enterTouchDelay={0}>
                                        <IconButton color='inherit'>
                                            <TvSharpIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                        </div>
                        <Typography variant={large ? "h4" : "h5"} className={styles.descriptionTitle}>Описание</Typography>
                        <Divider></Divider>
                        <Typography variant='subtitle1' mt={2} dangerouslySetInnerHTML={{ __html: data?.description }}></Typography>
                    </Box>
                </section>
            )
            }
            {modalIsOpen && <BookForm handleClose={handleCloseModal} open={modalIsOpen} bookingData={{ start: startBookingDate, end: endBookingDate, peoples: peoplesCount, houseId }} />}
            <BigImage handleClose={handleCloseImgModal} open={imgModalIsOpen.open} image={imgModalIsOpen.imgSrc}/>
        </>
    );
}

export default Hotel;