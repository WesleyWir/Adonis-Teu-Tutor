import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import NotFoundException from "App/Exceptions/NotFoundException";
import Class from "App/Models/Class";
import I18nSingleton from 'App/Services/Singletons/I18nSingleton';

export default class EducatorClassesController {
    async showByEducator({ auth }: HttpContextContract) {
        const educator = auth.user
        const classe = await Class.query().where('educator_id', educator.id).preload('classCalendars').preload('contact_mean').preload('educator').preload('student');
        if (!classe) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return classe;
    }
}
