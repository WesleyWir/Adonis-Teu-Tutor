import NotFoundException from "App/Exceptions/NotFoundException";
import Class from "App/Models/Class";
import ClassCalendar from "App/Models/ClassCalendar";
import Educator from "App/Models/Educator";
import EducatorCalendar from "App/Models/EducatorCalendar";
import EducatorContactMean from "App/Models/EducatorContactMean";
import Student from "App/Models/Student";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class StudentClassesServices {
    public async createClass(student: Student, classPayload: Object) {
        const classPayloadToCreate = {
            note: classPayload.note
        }
        const educator = await Educator.findOrFail(classPayload.educator_id)
        const createdClass = await Class.create(classPayloadToCreate)
        await createdClass.related('student').associate(student)
        await createdClass.related('educator').associate(educator)
        if (classPayload.educator_contact_means_id) {
            const educatorContactMean = await EducatorContactMean.findOrFail(classPayload.educator_contact_means_id)
            await createdClass.related('contact_mean').associate(educatorContactMean)
        }

        for (const calendar of classPayload.class_calendars) {
            let educatorCalendar = await EducatorCalendar.findOrFail(calendar.educator_calendar_id)
            let createdClassCalendar = await ClassCalendar.create(calendar)
            await createdClassCalendar.related('class').associate(createdClass)
            await createdClassCalendar.related('educatorCalendar').associate(educatorCalendar)
            await createdClassCalendar.save()
            educatorCalendar.status = false
            await educatorCalendar.save()
        }
        // TODO change calendar status
        await createdClass.save()
        return createdClass;
    }
}