import BadRequestException from "App/Exceptions/BadRequestException";
import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorCalendar from "App/Models/EducatorCalendar";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class EducatorsCalendarServices{

    async create(calendarPayload: object, educator: Educator){
        await this.hasTheHourStored(educator, calendarPayload.date, calendarPayload.startTime, calendarPayload.endTime)
        return await educator.related('educatorCalendars').create(calendarPayload)
    }

    async update(id: number, calendarPayload: object, educator: Educator){
        await this.hasTheHourStored(educator, calendarPayload.date, calendarPayload.startTime, calendarPayload.endTime)
        return await educator.related('educatorCalendars').updateOrCreate({ id: id}, calendarPayload);
    }

    async delete(id: number, educator: Educator){
        const deleteCalendar: EducatorCalendar|null = await educator.related('educatorCalendars').query()
        .where('id', id)
        .andWhere('educator_id', educator.id)
        .first()
        if(!(deleteCalendar)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.calendar_not_found'))
        return await deleteCalendar.delete();
    }

    async getByEducator(educatorId: string){
        const educator: Educator|null = await Educator.find(educatorId);
        if(!educator) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return await educator.related('educatorCalendars').query()
    }

    /**
     * Validate the hour has stored
     * @param {Educator} educator
     * @param {Date} date
     * @param {string} startTime 00:00:00
     * @param {string} endTime 00:00:00
     * @returns {Boolean} output
     */
    async hasTheHourStored(educator: Educator, date: Date, startTime: string, endTime: string){
        const alreadyExistTheHours = await educator.related('educatorCalendars')
        .query().select('start_time', 'end_time')
        .where('date', date.toFormat('yyyy-MM-dd'))
        .andWhere('start_time', '>=', startTime)
        .andWhere('end_time', '<=', endTime)

        if(alreadyExistTheHours.length){
            throw new BadRequestException(I18nSingleton.getInstance().executeFormatMessage('messages.calendar_already_exist'))
        }
    }
}