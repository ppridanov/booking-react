import styles from './hotel.module.css';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Modal from '../modal/modal';
import 'swiper/css';
import Slider from './slider/slider';
import { getMinPrice, isObjectNotEmpty, sendData } from '../../helpers/helpers';
import { mainUrl } from '../../helpers/variables';
import BookForm from './form/book-form';
import Button from '../../ui/button/button';
import ru from 'date-fns/locale/ru';
import { useSelector } from 'react-redux';

function Hotel() {
    const { houseId } = useParams();
    const { startDate, endDate } = useSelector(state => state.findHouses)
    const [data, setData] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imgModalIsOpen, setImgModalIsOpen] = useState({open: false, imgSrc: ''});
    const [startBookingDate, setStartDate] = useState(startDate);
    const [endBookingDate, setEndDate] = useState(endDate);
    const [peoplesCount, setPeoplesCount] = useState(1);

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
        e.preventDefault();
        setModalIsOpen(true);
    }

    const handleCloseModal = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
    }

    const handleOpenImgModal = (imgSrc) => {
        setImgModalIsOpen({
            imgSrc: imgSrc,
            open: true
        });
        console.log(imgSrc);
    }

    const handleCloseImgModal = (e) => {
        e.preventDefault();
        setImgModalIsOpen({
            imgSrc: '',
            open: false
        });
    }

    const handlerOnSubmitForm = (event) => {
        event.preventDefault();
        handleOpenModal(event);
    }
    return (
        <>
            <div className={styles.dFlexCentered100}>
                {isLoading && <h1>Загрузка...</h1>}
                {isError && (
                    <>
                        <h1>Ошибка... Обратитесь к администратору</h1>
                        <button style={{ marginTop: 20 }} className='button' onClick={(e) => window.location.reload()}>Перезагрузить страницу</button>
                    </>
                )}
            </div>
            {(isObjectNotEmpty(data)) && (
                <section className={styles.book}>
                    <div className={`${styles.top} ${styles.content}`}>
                        <div className={styles.content__left}>
                            <Slider images={data.images} openModal={handleOpenImgModal} />
                        </div>
                        <div className={styles.content__right}>
                            <h1 className={styles.price}>Цены от {getMinPrice(data.prices)} р.</h1>
                            <form className={`form ${styles.form}`} onSubmit={handlerOnSubmitForm} autoComplete="off">
                                <div className={`form__item ${styles.form__item}`}>
                                    <label htmlFor={styles.from}>Дата заезда</label>
                                    <DatePicker
                                        selected={startBookingDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startBookingDate}
                                        minDate={startBookingDate}
                                        endDate={endBookingDate}
                                        locale={ru}
                                        required
                                        dateFormat={"yyyy-MM-dd"}
                                    />
                                </div>
                                <div className="form__item">
                                    <label htmlFor="to">Дата выезда</label>
                                    <DatePicker
                                        selected={endBookingDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startBookingDate}
                                        endDate={endBookingDate}
                                        minDate={startBookingDate}
                                        locale={ru}
                                        required
                                        dateFormat={"yyyy-MM-dd"}
                                    />
                                </div>
                                <div className="form__item">
                                    <label htmlFor="people">Количество человек</label>
                                    <select className="input" name="people" defaultValue={1} onChange={(e) => setPeoplesCount(e.target.value)} required id="people">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="4">7</option>
                                        <option value="5">8</option>
                                        <option value="6">9</option>
                                        <option value="6">10</option>
                                    </select>
                                </div>
                                <Button type="submit">Бронировать</Button>
                            </form>
                            <Link to={`/`} style={{ marginTop: 20 }} className='button button-grey'>Вернуться назад</Link>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h3 className={styles.descriptionTitle}>Описание</h3>
                        <p className={styles.descriptionText}>
                            {data.description}
                        </p>
                    </div>
                </section>
            )
            }
            {modalIsOpen && (
                <Modal onClose={handleCloseModal} title={`Бронирование дома №${houseId}`}>
                    <h1><BookForm bookingData={{ start: startBookingDate, end: endBookingDate, peoples: peoplesCount, houseId }} /></h1>
                </Modal>)
            }
            {imgModalIsOpen['open'] && (
                <Modal onClose={handleCloseImgModal} className='imgModal' colour="#FFFFFF">
                    <img className={styles.modalImage} src={imgModalIsOpen['imgSrc']} alt="bigImage" />
                </Modal>)
            }
        </>
    );
}

export default Hotel;