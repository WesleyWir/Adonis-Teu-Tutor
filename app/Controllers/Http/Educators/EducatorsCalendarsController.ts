import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Educator from 'App/Models/Educator';
import EducatorsCalendarServices from 'App/Services/Calendar/EducatorsCalendarServices'
import StoreEducatorCalendarValidator from 'App/Validators/Educators/StoreEducatorCalendarValidator';
import StoreManyEducatorCalendarValidator from 'App/Validators/Educators/StoreManyEducatorCalendarValidator';

export default class EducatorsCalendarsController {
    private _educatorCalendarService : EducatorsCalendarServices;

    constructor(){
        this._educatorCalendarService = new EducatorsCalendarServices();
    }

    async store({ request, auth }: HttpContextContract){
        const calendarPayload = await request.validate(StoreEducatorCalendarValidator);
        return await this._educatorCalendarService.create(calendarPayload, auth.user)
    }

    async storeMany({request, auth}: HttpContextContract){
        const calendarManyPayload = await request.validate(StoreManyEducatorCalendarValidator);
        return await this._educatorCalendarService.createMany(calendarManyPayload, auth.user)
    }

    async update({ request, auth, bouncer }: HttpContextContract){
        const id = await request.param('id')
        await bouncer.authorize('isTheHandledEducator', auth.user);
        const calendarPayload = await request.validate(StoreEducatorCalendarValidator);
        return await this._educatorCalendarService.update(id, calendarPayload, auth.user)
    }

    async destroy({ request, auth, bouncer }: HttpContextContract){
        const id = await request.param('id')
        const educator: Educator = auth.user
        await bouncer.authorize('isTheHandledEducator', educator);
        return await this._educatorCalendarService.delete(id, educator);
    }

    async showByEducator({ request }: HttpContextContract){
        const educatorId = await request.param('educatorId')
        return await this._educatorCalendarService.getByEducator(educatorId);
    }
}
