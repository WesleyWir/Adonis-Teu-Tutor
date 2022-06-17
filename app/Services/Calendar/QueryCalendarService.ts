import Educator from "App/Models/Educator";
import EducatorCalendar from "App/Models/EducatorCalendar";
import { DateTime } from "luxon";


export default class QueryCalendarService {
    private query;

    public constructor() {
        this.query = EducatorCalendar.query().preload('educator').where('status', true)
    }

    public async setOrder(orderBy: string, order: string) {
        return this.query.orderBy(orderBy, order);
    }

    public async setEducator(educator: Educator) {
        return this.query.andWhere('educator_id', '=', educator.id)
    }

    public async setMonthAndYear(month: number, year: number){
        const dateTime = DateTime.fromObject({ year, month});
        return this.query.andWhereBetween('date', [dateTime.startOf('month').toISO(), dateTime.endOf('month').toISO()])
    }

    public async setDay(date: Date){
        return this.query.andWhere('date', '=', date)
    }

    public async execute() {
        return await this.query
    }
}