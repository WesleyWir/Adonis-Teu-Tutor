import NotFoundException from "App/Exceptions/NotFoundException";
import Student from "App/Models/Student";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class StudentsService {
    
    public async getAll(){
        return Student.all();
    }

    public async createStudent(studentPayload: object){
        return await Student.create(studentPayload);
    }

    public async getById(id: string){
        const student = await this.findStudentOrFail(id);
        return student;
    }

    public async getEditableStudent(id: string){
        await this.findStudentOrFail(id);
        return await Student.query().select('id', 'name', 'birthdate', 'avatar').where('id', id).first();    
    }

    public async updateStudent(student: Student, updateStudentPayload: object){
        return await student.merge(updateStudentPayload).save()
    }

    public async deleteStudent(id: string){
        const student = await this.findStudentOrFail(id);
        return student.delete();
    }

    private async findStudentOrFail(id: string){
        const student = await Student.find(id);
        if(!student) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.student_not_found'));
        return student;
    }
}