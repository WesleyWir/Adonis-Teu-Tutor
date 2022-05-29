import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student';
import StudentClassesServices from 'App/Services/Classes/StudentClassesServices';
import StudentStoreValidator from 'App/Validators/Classes/StudentStoreValidator';

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
}
