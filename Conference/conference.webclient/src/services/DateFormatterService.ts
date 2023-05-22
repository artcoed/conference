import moment from 'moment';

moment.locale('ru')

export const getFromDateTime = (dateTime: Date) => {
    return moment(dateTime).format("lll")
}