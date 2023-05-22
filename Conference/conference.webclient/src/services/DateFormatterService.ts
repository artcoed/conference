import moment from 'moment';

moment.locale('ru')

export const getStringFromDateTime = (dateTime: Date = new Date()) => {
    return moment(dateTime).format("lll")
}