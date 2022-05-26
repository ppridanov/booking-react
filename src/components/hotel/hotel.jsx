import styles from './hotel.module.css';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Modal from '../modal/modal';
import 'swiper/css';
import Slider from './slider/slider';
import { getSumm, isObjectNotEmpty, sendData } from '../../helpers/helpers';
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
    const [imgModalIsOpen, setImgModalIsOpen] = useState({ open: false, imgSrc: '' });
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
                            <h2 className={styles.price}>Цена: {data?.prices ? getSumm([startBookingDate, endBookingDate], data.prices) : 0} р.</h2>
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
                                <div className={`form__item ${styles.form__item}`}>
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
                                <div className={`form__item ${styles.form__item}`}>
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
                                <h4>Предоплата: {data?.prices ? (getSumm([startBookingDate, endBookingDate], data.prices) / 2) : 0}</h4>
                                <Button type="submit">Бронировать</Button>
                            </form>
                            <Link to={`/`} style={{ marginTop: 20 }} className='button button-grey'>Вернуться назад</Link>
                        </div>
                    </div>
                    <div className={styles.description}>
                        {(data?.is_cond === "1" || data?.is_mang === "1" || data?.is_tv === "1" || data?.is_wifi === "1") && (
                            <h3 className={styles.descriptionTitle}>Удобства</h3>
                        )}
                        <div className={`${styles.icons}`}>
                            {data?.is_cond === "1" && (
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 206.819 206.819" xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M188.97,26.745H17.847C8.006,26.745,0,34.757,0,44.609v49.852c0,9.851,8.006,17.864,17.847,17.864h74.865v49.921h7.132     v-49.921h7.132v49.921h7.132v-49.921h74.865c9.841,0,17.846-8.013,17.846-17.864V44.609     C206.817,34.757,198.811,26.745,188.97,26.745z M199.685,94.46c0,5.916-4.807,10.732-10.715,10.732H17.847     c-5.908,0-10.715-4.816-10.715-10.732V44.609c0-5.916,4.807-10.732,10.715-10.732H188.97c5.908,0,10.715,4.816,10.715,10.732     V94.46z" />
                                                <rect x="35.658" y="87.363" width="131.986" height="7.132" />
                                                <rect x="21.395" y="76.666" width="164.027" height="7.132" />
                                                <path d="M153.33,158.679c-1.969,0-3.566,1.595-3.566,3.566c0,5.899-4.799,10.697-10.697,10.697     c-5.899,0-10.697-4.799-10.697-10.697v-39.224h-7.132v39.224c0,9.83,7.999,17.829,17.829,17.829     c9.83,0,17.829-7.999,17.829-17.829C156.896,160.274,155.299,158.679,153.33,158.679z" />
                                                <path d="M78.448,162.245c0,5.899-4.799,10.697-10.697,10.697c-5.898,0-10.697-4.799-10.697-10.697     c0-1.971-1.597-3.566-3.566-3.566c-1.969,0-3.566,1.595-3.566,3.566c0,9.83,7.999,17.829,17.829,17.829     c9.83,0,17.829-7.999,17.829-17.829v-39.224h-7.132V162.245z" />
                                            </g>
                                        </g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>
                            )}
                            {data?.is_mang === "1" && (
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 464.601 464.601" xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <path d="M224.3,112c-4.418,0-8-3.582-8-8c0-11.313,5.979-17.291,10.344-21.656c3.922-3.922,5.656-5.845,5.656-10.341
			c0-4.498-1.734-6.421-5.657-10.344c-4.365-4.365-10.343-10.343-10.343-21.657s5.979-17.292,10.343-21.658
			C230.566,14.421,232.3,12.497,232.3,8c0-4.418,3.582-8,8-8s8,3.582,8,8c0,11.314-5.978,17.292-10.343,21.657
			c-3.923,3.923-5.657,5.847-5.657,10.344c0,4.497,1.734,6.421,5.657,10.344c4.364,4.365,10.343,10.344,10.343,21.658
			c0,11.313-5.979,17.291-10.344,21.656c-3.922,3.922-5.656,5.845-5.656,10.341C232.3,108.418,228.718,112,224.3,112z"/>
                                        </g>
                                        <g>
                                            <path d="M264.3,112c-4.418,0-8-3.582-8-8c0-11.313,5.979-17.291,10.344-21.656c3.922-3.922,5.656-5.845,5.656-10.341
			c0-4.498-1.734-6.421-5.657-10.344c-4.365-4.365-10.343-10.343-10.343-21.657c0-4.418,3.582-8,8-8s8,3.582,8,8
			c0,4.497,1.734,6.421,5.657,10.344c4.364,4.365,10.343,10.344,10.343,21.658c0,11.313-5.979,17.291-10.344,21.656
			c-3.922,3.922-5.656,5.845-5.656,10.341C272.3,108.418,268.718,112,264.3,112z"/>
                                        </g>
                                        <g>
                                            <path d="M184.3,112c-4.418,0-8-3.582-8-8c0-11.313,5.979-17.291,10.344-21.656c3.922-3.922,5.656-5.845,5.656-10.341
			c0-4.498-1.734-6.421-5.657-10.344c-4.365-4.365-10.343-10.343-10.343-21.657c0-4.418,3.582-8,8-8s8,3.582,8,8
			c0,4.497,1.734,6.421,5.657,10.344c4.364,4.365,10.343,10.344,10.343,21.658c0,11.313-5.979,17.291-10.344,21.656
			c-3.922,3.922-5.656,5.845-5.656,10.341C192.3,108.418,188.718,112,184.3,112z"/>
                                        </g>
                                        <g>
                                            <path d="M376.3,216h-288c-22.056,0-40-17.944-40-40v-48c0-4.418,3.582-8,8-8s8,3.582,8,8v48c0,13.233,10.767,24,24,24h288
			c13.233,0,24-10.767,24-24v-48c0-4.418,3.582-8,8-8s8,3.582,8,8v48C416.3,198.056,398.356,216,376.3,216z"/>
                                        </g>
                                        <g>
                                            <path d="M368.3,135c-4.418,0-8-3.582-8-8v-15c0-13.234-10.767-24-24-24h-57c-4.418,0-8-3.582-8-8s3.582-8,8-8h57
			c22.056,0,40,17.944,40,40v15C376.3,131.418,372.718,135,368.3,135z"/>
                                        </g>
                                        <g>
                                            <path d="M96.3,135c-4.418,0-8-3.582-8-8v-15c0-22.056,17.944-40,40-40h68c4.418,0,8,3.582,8,8s-3.582,8-8,8h-68
			c-13.233,0-24,10.767-24,24v15C104.3,131.418,100.718,135,96.3,135z"/>
                                        </g>
                                        <g>
                                            <path d="M424.3,136h-384c-4.418,0-8-3.582-8-8s3.582-8,8-8h384c4.418,0,8,3.582,8,8S428.718,136,424.3,136z" />
                                        </g>
                                        <g>
                                            <path d="M72.438,464.601c-0.339,0-0.682-0.021-1.027-0.066c-4.382-0.562-7.479-4.57-6.918-8.952l25.258-197
			c0.562-4.382,4.561-7.484,8.952-6.918c4.382,0.562,7.479,4.57,6.917,8.952l-25.256,197
			C79.845,461.654,76.404,464.601,72.438,464.601z"/>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M100.32,263.202c-1.017,0-2.05-0.066-3.069-0.196c-6.361-0.815-12.021-4.058-15.941-9.131
				c-3.92-5.073-5.629-11.369-4.813-17.727l3.739-29.165c0.562-4.382,4.561-7.485,8.952-6.918c4.382,0.562,7.479,4.57,6.917,8.953
				l-3.739,29.166c-0.271,2.12,0.299,4.218,1.605,5.909c1.306,1.691,3.192,2.772,5.313,3.043c4.403,0.564,8.399-2.597,8.953-6.917
				l4.261-33.235c0.561-4.382,4.56-7.485,8.952-6.918c4.382,0.562,7.479,4.57,6.917,8.952l-4.26,33.235
				C122.575,254.196,112.349,263.202,100.32,263.202z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <path d="M392.291,464.58c-3.966,0-7.407-2.946-7.925-6.984l-25.254-196.979c-0.563-4.382,2.535-8.39,6.917-8.952
			c4.39-0.566,8.39,2.535,8.952,6.918l25.254,196.979c0.563,4.383-2.535,8.391-6.917,8.953
			C392.972,464.558,392.629,464.58,392.291,464.58z"/>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M364.411,263.202c-12.028,0-22.254-9.006-23.784-20.95l-4.261-33.235c-0.563-4.382,2.535-8.39,6.917-8.952
				c4.391-0.567,8.391,2.535,8.952,6.918l4.261,33.235c0.555,4.322,4.534,7.48,8.954,6.917c4.374-0.561,7.478-4.577,6.916-8.953
				l-3.738-29.165c-0.563-4.383,2.535-8.391,6.917-8.953c4.39-0.567,8.391,2.535,8.952,6.918l3.739,29.166
				c1.683,13.126-7.628,25.174-20.753,26.857C366.462,263.136,365.429,263.202,364.411,263.202z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <path d="M232.3,192c-13.233,0-24-10.766-24-24s10.767-24,24-24c4.418,0,8,3.582,8,8s-3.582,8-8,8c-4.411,0-8,3.589-8,8
			s3.589,8,8,8c2.848,0,5.505-1.535,6.935-4.006c2.211-3.825,7.106-5.132,10.931-2.919c3.824,2.212,5.131,7.106,2.919,10.931
			C248.804,187.404,240.84,192,232.3,192z"/>
                                        </g>
                                        <g>
                                            <path d="M381.3,392h-298c-4.418,0-8-3.582-8-8s3.582-8,8-8h298c4.418,0,8,3.582,8,8S385.718,392,381.3,392z" />
                                        </g>
                                        <g>
                                            <path d="M375.3,368h-286c-4.418,0-8-3.582-8-8s3.582-8,8-8h286c4.418,0,8,3.582,8,8S379.718,368,375.3,368z" />
                                        </g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>
                            )}
                            {data?.is_wifi === "1" && (
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 494.45 494.45" xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M395.225,277.325c-6.8,0-13.5-2.6-18.7-7.8c-71.4-71.3-187.4-71.3-258.8,0c-10.3,10.3-27.1,10.3-37.4,0     s-10.3-27.1,0-37.4c92-92,241.6-92,333.6,0c10.3,10.3,10.3,27.1,0,37.4C408.725,274.725,401.925,277.325,395.225,277.325z" />
                                            </g>
                                            <g>
                                                <path d="M323.625,348.825c-6.8,0-13.5-2.6-18.7-7.8c-15.4-15.4-36-23.9-57.8-23.9s-42.4,8.5-57.8,23.9     c-10.3,10.3-27.1,10.3-37.4,0c-10.3-10.3-10.3-27.1,0-37.4c25.4-25.4,59.2-39.4,95.2-39.4s69.8,14,95.2,39.5     c10.3,10.3,10.3,27.1,0,37.4C337.225,346.225,330.425,348.825,323.625,348.825z" />
                                            </g>
                                            <g>
                                                <circle cx="247.125" cy="398.925" r="35.3" />
                                            </g>
                                            <g>
                                                <path d="M467.925,204.625c-6.8,0-13.5-2.6-18.7-7.8c-111.5-111.4-292.7-111.4-404.1,0c-10.3,10.3-27.1,10.3-37.4,0     s-10.3-27.1,0-37.4c64-64,149-99.2,239.5-99.2s175.5,35.2,239.5,99.2c10.3,10.3,10.3,27.1,0,37.4     C481.425,202.025,474.625,204.625,467.925,204.625z" />
                                            </g>
                                        </g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>
                            )}
                            {data?.is_tv === "1" && (
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 503.588 503.588" xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <path d="M492.128,76.714H11.676C5.168,76.714,0,80.238,0,86.75v27.276V354.25v27.512c0,6.512,5.168,13.632,11.676,13.632h196.84    v15.74H59.132c-4.348,0-7.868,3.524-7.868,7.868c0,4.344,3.52,7.872,7.868,7.872h387.404c4.344,0,7.868-3.528,7.868-7.872    s-3.524-7.868-7.868-7.868H295.072v-15.74h197.056c6.508,0,11.46-7.12,11.46-13.632V354.25V114.03V86.754    C503.588,80.238,498.636,76.714,492.128,76.714z M257.448,379.27c-1.452,1.456-3.5,2.288-5.54,2.288    c-2.084,0-4.096-0.832-5.552-2.288c-1.496-1.496-2.32-3.5-2.32-5.58c0-2.092,0.824-4.092,2.28-5.556    c2.952-2.952,8.224-2.952,11.132,0c1.46,1.46,2.328,3.46,2.328,5.556C259.776,375.774,258.908,377.774,257.448,379.27z     M15.732,356.05V116.058h472.112V356.05H15.732z" />
                                        </g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>
                            )}
                        </div>
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