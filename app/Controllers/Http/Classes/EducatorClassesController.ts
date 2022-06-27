import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import NotFoundException from "App/Exceptions/NotFoundException";
import Class from "App/Models/Class";
import ClassCalendar from 'App/Models/ClassCalendar';
import I18nSingleton from 'App/Services/Singletons/I18nSingleton';
import { ClassCalendarStatus } from 'Contracts/enums';

export default class EducatorClassesController {
    async showByEducator({ auth }: HttpContextContract) {
        const educator = auth.user
        const classe = await Class.query().where('educator_id', educator.id).preload('classCalendars', (query) => query
            .preload('educatorCalendar')).preload('contact_mean').preload('educator').preload('student');
        if (!classe) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return classe;
    }

    async toDoClass({ request }: HttpContextContract){
        const id = request.param('id');
        const classCalendars = await ClassCalendar.findOrFail(id)
        classCalendars.status = ClassCalendarStatus.TO_DO;
        return await classCalendars.save()
    }

    async completeClass({ request }: HttpContextContract){
        const id = request.param('id');
        const classCalendars = await ClassCalendar.findOrFail(id)
        classCalendars.status = ClassCalendarStatus.COMPLETED;
        return await classCalendars.save()
    }

    async cancelClass({ request }: HttpContextContract){
        const id = request.param('id');
        const classCalendars = await ClassCalendar.findOrFail(id)
        classCalendars.status = ClassCalendarStatus.CANCELLED;
        return await classCalendars.save()
    }
}
