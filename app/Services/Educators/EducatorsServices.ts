import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import Subject from "App/Models/Subject";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class EducatorsService {
    
    public async getAll(){
        return Educator.all();
    }

    public async createEducator(educatorPayload: object){
        let educator = await Educator.create(educatorPayload);
        if(educatorPayload.subject){
            const subject = await Subject.findOrFail(educatorPayload.subject);
            await educator.related('subject').associate(subject);
        }
        return await educator;
    }

    public async getById(id: string){
        return await this.findEducatorOrFail(id);
    }

    public async getEditableEducator(id: string){
        await this.findEducatorOrFail(id);
        return await Educator.query().select('id', 'name', 'birthdate', 'avatar', 'average_price', 'subject_id').where('id', id).first();    
    }

    public async updateEducator(educator: Educator, updateEducatorPayload: object){
        console.log(updateEducatorPayload)
        if(updateEducatorPayload.subject_id){
            const subject = await Subject.findOrFail(updateEducatorPayload.subject_id);
            await educator.related('subject').associate(subject);
        }
        return await educator.merge(updateEducatorPayload).save()
    }

    public async deleteEducator(id: string){
        const educator = await this.findEducatorOrFail(id);
        return await educator.delete();
    }

    private async findEducatorOrFail(id: string){
        const educator = await Educator.find(id);
        if(!educator) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return educator;
    }
}