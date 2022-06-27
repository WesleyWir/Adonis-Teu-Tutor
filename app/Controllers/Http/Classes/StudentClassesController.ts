import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException';
import Class from 'App/Models/Class';
import ClassCalendar from 'App/Models/ClassCalendar';
import Student from 'App/Models/Student';
import StudentClassesServices from 'App/Services/Classes/StudentClassesServices';
import I18nSingleton from 'App/Services/Singletons/I18nSingleton';
import StudentStoreValidator from 'App/Validators/Classes/StudentStoreValidator';
import StudentUpdateValidator from 'App/Validators/Classes/StudentUpdateValidator';
import { ClassCalendarStatus } from 'Contracts/enums';

export default class StudentClassesController {
    private _studentClassesServices: StudentClassesServices

    constructor(){
        this._studentClassesServices = new StudentClassesServices();
    }

    async store({ auth, request }: HttpContextContract){
        const student: Student = auth.user
        const storeClassPayload = await request.validate(StudentStoreValidator)
        return await this._studentClassesServices.createClass(student, storeClassPayload)
    }

    async update({ request }: HttpContextContract){
        const id = request.param('id');
        const storeClassPayload = await request.validate(StudentUpdateValidator)
        return await this._studentClassesServices.updateClass(id, storeClassPayload)
    }

    async showByStudent({ auth }: HttpContextContract){
        const student = auth.user
        const classe = await Class.query().where('student_id', student.id).preload('classCalendars', (query) => query
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

    async cancelClass({ request }: HttpContextContract){
        const id = request.param('id');
        const classCalendars = await ClassCalendar.findOrFail(id)
        classCalendars.status = ClassCalendarStatus.CANCELLED;
        return await classCalendars.save()
    }
}
