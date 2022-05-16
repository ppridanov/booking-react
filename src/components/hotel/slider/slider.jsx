import styles from './slider.module.css';
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper';
import 'swiper/css/navigation';

import 'swiper/css';

function Slider(props) {

    const images = props.images;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {images.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.bgImg} style={{ backgroundImage: `url(${image})` }}></div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div style={{ backgroundImage: `url(${image})` }} className={styles.bgImgThumbs}></div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>

    );
}

export default Slider;