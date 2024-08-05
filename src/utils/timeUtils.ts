// const res = getTimeDifference('2023-10-01T10:00:00', '2023-10-01T10:15:23');
// // console.log(moment(res.milliseconds).format('HH:mm:ss'));
// let diff = (new Date('2023-10-01T10:15:23')).getTime() - (new Date('2023-10-01T10:00:00')).getTime()
// console.log(moment(diff).format('mm:ss'));

import moment from '@/plugins/momentPlugin';

// Получить из кол-ва миллисекунд кол-во минут
export function computeMinutesByMs(milliseconds: number | undefined) {
    try {
        if(milliseconds) {
            const minutes = Math.ceil(milliseconds / 60000);
            return minutes;
        } 
        return null;
    } catch (err) {
        console.error('/src/utils/timeUtils.ts: computeMinutesByMs => ', err);
        throw err;
    }
}

export function formattedDateByTemplate(date: string | Date | null | undefined, template?: string ) {
    try {
        if(date) {
            return moment(date).format(template ?? 'DD-MM-YYYY');
        }
    } catch (err) {
        console.error('/src/utils/timeUtils.ts: formattedDateByTemplate => ', err);
        throw err;
    }
}