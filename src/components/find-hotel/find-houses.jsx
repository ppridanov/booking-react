import { formatDate, isObjectNotEmpty, jsonCustomParser, getSumm, getNumberOfDays, declination } from '../../helpers/helpers';
import { Link as RouterLink } from 'react-router-dom';

import ruLocale from 'date-fns/locale/ru';
import styles from './find-houses.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_FIND_LIST, postFindHouses, SET_END_DATE, SET_START_DATE, CLEAR_FINDED_STATUS } from '../../services/actions/find-houses';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography, Tooltip, IconButton } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import TvSharpIcon from '@mui/icons-material/TvSharp';

import history from '../../history';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';

function FindHouses() {
    const { finded, findRequest, findFailed, findLoaded, startDate, endDate } = useSelector(state => state.findHouses);
    const [findEmpty, setFindEmpty] = useState(false);
    const dispatch = useDispatch();
    history.push(window.location.href);
    const handlerOnSubmitForm = (event) => {
        event.preventDefault();
        dispatch({ type: CLEAR_FIND_LIST })
        const dates = { "start_date": formatDate(startDate), "end_date": formatDate(endDate) }
        dispatch(postFindHouses(dates));
        if (!findRequest && !findFailed && !findLoaded && !isObjectNotEmpty(finded)) {
            setFindEmpty(true);
        } else {
            setFindEmpty(false);
        }
    }

    const handleChangeStartDate = (date) => {
        dispatch({ type: SET_START_DATE, payload: date })
    };

    const handleChangeEndDate = (date) => {
        dispatch({ type: SET_END_DATE, payload: date })
    };

    const handleClear = (e) => {
        e.preventDefault();
        dispatch({ type: CLEAR_FIND_LIST });
        dispatch({type: CLEAR_FINDED_STATUS});
        setFindEmpty(false);
    }
    return (
        <div className={styles.findHotel}>
            <div className={styles.find}>
                <form className={styles.form} onSubmit={handlerOnSubmitForm}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                        <DatePicker
                            disableMaskedInput
                            label={'Заезд'}
                            value={startDate}
                            onChange={(startDate) => {
                                handleChangeStartDate(startDate)
                            }}
                            minDate={startDate}
                            inputFormat={'dd MMM yyyy'}
                            renderInput={(params) => <><TextField {...params} /><Box mr={2} /></>}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                        <DatePicker
                            disableMaskedInput
                            label={'Выезд'}
                            value={endDate}
                            onChange={(endDate) => {
                                handleChangeEndDate(endDate)
                            }}
                            inputFormat={'dd MMM yyyy'}
                            minDate={new Date(startDate)}
                            renderInput={(params) => <><TextField {...params} /><Box mr={2} /></>}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" type='submit'>Подобрать</Button>
                    <Button className={styles.clearButton} type='click' onClick={handleClear} color="error">Очистить</Button>
                </form>
            </div>
            <Divider sx={{ marginBottom: 2 }} />
            <div id="findedContent" className={styles.findedContent}>
                {(findRequest || findFailed) && (
                    <>
                        {findRequest && !findFailed && <Typography textAlign={'center'} variant='h5'>Загрузка...</Typography>}
                        {findFailed && !findRequest && (
                            <>
                                <Typography textAlign={'center'} variant='h5'>Ошибка<br /><br />Обратитесь к администратору<br />или<br />повторите поиск.</Typography>
                            </>
                        )}
                    </>
                )}
                {!findLoaded && !findFailed && !findRequest && findEmpty && (
                    <>
                        <Typography textAlign={'center'} variant='h5'>На выбранные вами даты нет свободных мест.<br /><br />Попробуйте повторить поиск на другие даты.</Typography>
                    </>
                )}
                {!findLoaded && !findFailed && !findRequest && !findEmpty && (
                    <>
                        <Typography textAlign={'center'} variant='h5'>Выберите дату заезда и дату выезда</Typography>
                    </>
                )}
                {isObjectNotEmpty(finded) && (
                    <>
                        <Typography variant='h6'>Результаты: <b>на {format(startDate, "MMM dd", { locale: ru })} - {format(endDate, "MMM dd, yyyy", { locale: ru })} | {+getNumberOfDays(startDate, endDate)} {declination(+getNumberOfDays(startDate, endDate), ['ночь', 'ночи', 'ночей'])}</b></Typography>
                    </>
                )}
                {isObjectNotEmpty(finded) && finded.map((item, index) => {
                    const images = jsonCustomParser(item.images) || null;
                    return <Card className={styles.card} key={index} sx={{ boxShadow: 3, marginBottom: 2 }}>
                        <CardMedia
                            component="div"
                            alt="green iguana"
                            height="140"
                            width="140"
                            className={styles.card__image}
                            style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">{item?.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item?.sdescr}
                            </Typography>
                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>
                            <Box sx={{ display: "flex" }}>
                                {item?.is_cond === "1" && (
                                    <Box>
                                        <Tooltip title="Есть кондиционер" arrow enterTouchDelay={0}>
                                            <IconButton color='inherit'>
                                                <AirIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                                {item?.is_mang === "1" && (
                                    <Box>
                                        <Tooltip title="Есть мангал" arrow enterTouchDelay={0}>
                                            <IconButton color='inherit'>
                                                <OutdoorGrillIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                                {item?.is_wifi === "1" && (
                                    <Box>
                                        <Tooltip title="Есть Wi-Fi" arrow enterTouchDelay={0}>
                                            <IconButton color='inherit'>
                                                <SignalWifi4BarIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                                {item?.is_tv === "1" && (
                                    <Box>
                                        <Tooltip title="Есть телевизор" arrow enterTouchDelay={0}>
                                            <IconButton color='inherit'>
                                                <TvSharpIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                        <CardActions className={styles.cardActions}>
                            <Typography variant="h6">
                                Цена: {item?.price ? getSumm([startDate, endDate], item.price) : 0} р.
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }} color="text.secondary">
                                Предоплата: {item?.price ? (getSumm([startDate, endDate], item.price) / 2) : 0} р.
                            </Typography>
                            <Typography mb={2} variant="body2" color="text.secondary">
                            </Typography>
                            <Button component={RouterLink} to={`/houses/${item?.id}`} style={{ width: "100%" }} variant="contained" type='submit'>Подробнее</Button>
                        </CardActions>
                    </Card>
                })}
            </div>
        </div>
    );
}

export default FindHouses;