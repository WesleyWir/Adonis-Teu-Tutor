import Class from "App/Models/Class";
import Educator from "App/Models/Educator";
import EducatorContactMean from "App/Models/EducatorContactMean";
import Student from "App/Models/Student";

export default class StudentClassesServices {
    public async createClass(student: Student, classPayload: Object) {
        // const educator = await Educator.findOrFail(classPayload.educator_id)
        // const educatorContactMean = await EducatorContactMean.findOrFail(classPayload.educator_contact_means_id)
        // const createdClass = await Class.create(classPayload)
        // await createdClass.related('student').associate(student)
        // await createdClass.related('educator').associate(educator)
        // await createdClass.related('contact_mean').associate(educatorContactMean)

        // for (const calendar of classPayload.class_calendars) {

        // }
        // TODO
    }
}