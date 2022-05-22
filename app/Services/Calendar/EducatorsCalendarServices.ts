import BadRequestException from "App/Exceptions/BadRequestException";
import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorCalendar from "App/Models/EducatorCalendar";
import I18nSingleton from "../Singletons/I18nSingleton";
import QueryCalendarService from "./QueryCalendarService";

export default class EducatorsCalendarServices{

    async create(calendarPayload: object, educator: Educator){
        await this.hasTheHourStored(educator, calendarPayload.date, calendarPayload.start_time, calendarPayload.end_time)
        return await educator.related('educatorCalendars').create(calendarPayload)
    }

    async createMany(calendarManyPayload: object, educator: Educator){
        for (const payload of calendarManyPayload.dates) {
            await this.hasTheHourStored(educator, payload.date, payload.start_time, payload.end_time)
        }
        return await educator.related('educatorCalendars').createMany(calendarManyPayload.dates)
    }

    async update(id: number, calendarPayload: object, educator: Educator){
        await this.hasTheHourStored(educator, calendarPayload.date, calendarPayload.start_time, calendarPayload.end_time)
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

    async getByEducator(educatorId: string, params: {}){
        const educator: Educator|null = await Educator.find(educatorId);
        if(!educator) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        let queryCalendar = new QueryCalendarService()
        await queryCalendar.setEducator(educator)
        if(params.month && params.year) await queryCalendar.setMonthAndYear(params.month, params.year)
        if(params.order_by && params.order) await queryCalendar.setOrder(params.order_by, params.order)
        return await queryCalendar.execute()
    }

    /**
     * Validate the hour has stored
     * @param {Educator} educator
     * @param {Date} date
     * @param {string} start_time 00:00:00
     * @param {string} end_time 00:00:00
     * @returns {Boolean} output
     */
    async hasTheHourStored(educator: Educator, date: Date, start_time: string, end_time: string){
        console.log(date)
        const alreadyExistTheHours = await educator.related('educatorCalendars')
        .query().select('start_time', 'end_time')
        .where('date', date.toISODate())
        .andWhere('start_time', '>=', start_time)
        .andWhere('end_time', '<=', end_time)

        if(alreadyExistTheHours.length){
            throw new BadRequestException(I18nSingleton.getInstance().executeFormatMessage('messages.calendar_already_exist'))
        }
    }
}