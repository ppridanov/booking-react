import React, { useState } from 'react';
import styles from './book-form.module.css';
import Button from '../../../ui/button/button';
import Input from '../../../ui/input/input';
import { formatDate, getUniquesDates, sendData } from '../../../helpers/helpers';
import { mainUrl } from '../../../helpers/variables';
import NumberFormat from 'react-number-format';

const BookForm = (props) => {
    const { bookingData } = props;
    const [focused, setFocused] = React.useState(false);

    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [formData, setFormData] = useState({
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
                    if (data.mess) {
                        setMessageError(data.mess);
                    }
                }
            })
            .catch(err => {
                setIsError(true);
            });
    }
    return (
        <>
            <form className={styles.form} onSubmit={handlerOnSubmitForm} id="pay">
                <div className={styles.formBlock}>
                    <div className={`${styles.formItem} ${styles.formItemMB}`}>
                        <Input id="setStartDate" value={formData.arrival_date} name="arrival_date" type="text" readOnly={true} />
                        <label htmlFor="setStartDate">Дата заезда</label>
                    </div>
                    <div className={`${styles.formItem} ${styles.formItemMB}`}>
                        <Input id="setEndDate" value={formData.departure_date} name="departure_date" type="text" readOnly={true} />
                        <label htmlFor="setEndDate">Дата выезда</label>
                    </div>
                </div>
                <div className={styles.formBlock}>
                    <div className={styles.formItem}>
                        <Input name="senior" type="text" label="ФИО" onChange={handlerOnChangeInput} value={formData.senior} required={true} />
                    </div>
                    <div className={styles.formItem}>
                        <label className={`customNumberLabel ${focused && 'customNumberLabelFocus'}`}>Телефон</label>
                        <NumberFormat
                            className="input"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlerOnChangeInput}
                            onFocus={(e) => setFocused(true)}
                            onClick={(e) => setFocused(true)}
                            format="+7 (###) ###-####"
                            mask="_"
                            allowEmptyFormatting={false}
                            required={true}
                        />
                        {/* <Input name="phone" type="tel" label="Телефон" onChange={handlerOnChangeInput} value={formData.phone} required={true} /> */}
                    </div>
                    <div className={styles.formItem}>
                        <Input name="email" type="email" label="E-mail" onChange={handlerOnChangeInput} value={formData.email} required={true} />
                    </div>
                    <input id="setPeople" value={formData.peoples} type="hidden" name="people" />
                    <input id="setHouse" value={formData.houseId} type="hidden" name="id" />

                    <Button>Оплатить</Button>
                </div>
            </form>
            {isError && <p className={styles.status} style={{ marginTop: 10 }}>{messageError ? messageError : 'Произошла ошибка. Попробуйте повторить снова или обратитесь к администратору'}</p>}
        </>
    )
}

export default BookForm;