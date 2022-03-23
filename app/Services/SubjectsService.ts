import NotFoundException from "App/Exceptions/NotFoundException";
import Subject from "App/Models/Subject";

export default class SubjectsService{

    async getAll(){
        return await Subject.all();
    }

    async createSubject(subjectPayload: object){
        return await Subject.create(subjectPayload);
    }

    async getById(id: number){
        const subject = await this.findSubjectOrFail(id);
        return subject;
    }

    async getEditableSubject(id: string){
        return await this.findSubjectOrFail(id);
    }

    async updateSubject(subject:Subject, updateSubjectPayload: object){
        return await subject.merge(updateSubjectPayload).save();
    }

    async deleteSubject(id:string){
        const subject = await this.findSubjectOrFail(id);
        return subject.delete();
    }

    private async findSubjectOrFail(id: string){
        const subject = await Subject.find(id);
        if(!subject) throw new NotFoundException('Subject not found');
        return subject;
    }
}