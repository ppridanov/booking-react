import { Grid, Typography, Divider, Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import styles from "./hotel-description.module.css";
import AirIcon from '@mui/icons-material/Air';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import TvSharpIcon from '@mui/icons-material/TvSharp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const HotelDescription = (props) => {
    const data = props.data;
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.up("lg"));


    return <Box mt={3}>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Typography variant={large ? "h5" : "h6"} className={styles.descriptionTitle}>Подробнее</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant='subtitle1' dangerouslySetInnerHTML={{ __html: data?.description }}></Typography>
            </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Typography variant={large ? "h5" : "h6"} className={styles.descriptionTitle}>Удобства</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container>
                    {data?.is_cond === "1" && (
                        <Grid item xs={12} mb={2} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AirIcon />
                                <Typography ml={2} variant='subtitle1'>Кондиционер</Typography>
                            </Box>
                        </Grid>
                    )}

                    {data?.is_mang === "1" && (
                        <Grid item xs={12} mb={2} md={6}>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <OutdoorGrillIcon />
                                <Typography ml={2} variant='subtitle1'>Мангал</Typography>
                            </Box>
                        </Grid>
                    )}
                    {data?.is_wifi === "1" && (
                        <Grid item xs={12} mb={2} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SignalWifi4BarIcon />
                                <Typography ml={2} variant='subtitle1'>Wi-Fi</Typography>
                            </Box>
                        </Grid>
                    )}
                    {data?.is_tv === "1" && (
                        <Grid item xs={12} mb={2} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TvSharpIcon />
                                <Typography ml={2} variant='subtitle1'>Телевизор</Typography>
                            </Box>
                        </Grid>
                    )}
                    {data?.comforts && data?.comforts.length !== 0 && data.comforts.map((comfort, idx) => {
                        return (
                            <Grid item xs={12} mb={2} md={6} key={idx}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleOutlineIcon />
                                    <Typography ml={2} variant='subtitle1'>{comfort}</Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Typography variant={large ? "h5" : "h6"} className={styles.descriptionTitle}>Заезд и выезд</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container>
                    <Grid item xs={6} md={6}>
                        <Typography variant='subtitle1'>{data?.times ? data?.times[0] : "Не указано"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Typography variant='subtitle1'>{data?.times ? data?.times[0] : "Не указано"}</Typography>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
    </Box>
}