import { cropTextLength, formatDate, isObjectNotEmpty, jsonCustomParser, getSumm } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

import "react-datepicker/dist/react-datepicker.css";
import styles from './find-houses.module.css';
import Button from '../../ui/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_FIND_LIST, postFindHouses, SET_END_DATE, SET_START_DATE } from '../../services/actions/find-houses';


function FindHouses() {
    const { finded, findRequest, findFailed, findLoaded, startDate, endDate, findEmpty } = useSelector(state => state.findHouses);
    const dispatch = useDispatch();

    const handlerOnSubmitForm = (event) => {
        event.preventDefault();
        dispatch({ type: CLEAR_FIND_LIST })
        const dates = { "start_date": formatDate(startDate), "end_date": formatDate(endDate) }
        dispatch(postFindHouses(dates));
    }

    const handleChangeStartDate = (date) => {
        dispatch({ type: SET_START_DATE, payload: date })
    };

    const handleChangeEndDate = (date) => {
        dispatch({ type: SET_END_DATE, payload: date })
    };

    return (
        <div className={styles.findHotel}>
            <div className={styles.find}>
                <form className={styles.form} onSubmit={handlerOnSubmitForm}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => handleChangeStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat={"yyyy-MM-dd"}
                        locale={ru}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => handleChangeEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat={"yyyy-MM-dd"}
                        locale={ru}
                    />
                    <Button type="submit">??????????????????</Button>
                </form>
            </div>
            <div id="findedContent" className={styles.findedContent}>
                {(findRequest || findFailed) && (
                    <div className={styles.dFlexCentered100}>
                        {findRequest && !findFailed && <h1>????????????????...</h1>}
                        {findFailed && !findRequest && (
                            <>
                                <h1>????????????<br /><br />???????????????????? ?? ????????????????????????????<br />??????<br />?????????????????? ??????????.</h1>
                            </>
                        )}
                        {findEmpty && !findFailed && !findRequest && (<h1>???????????? ???? ??????????????!</h1>)}
                    </div>
                )}
                {isObjectNotEmpty(finded) && finded.map((item, index) => {
                    const images = jsonCustomParser(item.images) || null;
                    return (<div className={styles.card} key={index}>
                        <div className={styles.card__left}>
                            <img className={styles.card__image} src={images ? images[0] : ''} alt={`?????? ${item?.id}`} />
                            <div className={styles.card__text}>
                                <h3 className={styles.card__title}>{item.title ? item.title : '??????'}</h3>
                                <p className={styles.card__subtitle} dangerouslySetInnerHTML={{__html: cropTextLength(item?.descr)}}></p>
                            </div>
                        </div>
                        <div className={styles.card__right}>
                            <h3 className={styles.card__price}>????????: {item?.price ? getSumm([startDate, endDate], item.price) : 0} ??.</h3>
                            <h4 className={styles.card__price}>????????????????????: {item?.price ? (getSumm([startDate, endDate], item.price) / 2) : 0} ??.</h4>

                            <Link to={`houses/${item.id}`} className='button'>??????????????????</Link>
                        </div>
                    </div>)
                })}
                {(!isObjectNotEmpty(finded) && findLoaded) && (
                    <>
                        <h1>???? ?????????????????? ???????? ???????? ?????? ?????????????????? ????????.<br /><br />???????????????????? ?????????????????? ?????????? ???? ???????????? ????????.</h1>
                    </>
                )}
                {!findLoaded && !findFailed && !findRequest && (
                    <>
                        <h1>???????????????? ???????? ???????????? ?? ????????????</h1>
                    </>
                )}
            </div>
        </div>
    );
}

export default FindHouses;