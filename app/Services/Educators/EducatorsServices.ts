import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import Student from "App/Models/Student";

export default class EducatorsService {
    
    public async getAll(){
        return Educator.all();
    }

    public async createEducator(educatorPayload: object){
        return await Educator.create(educatorPayload);
    }

    public async getById(id: string){
        const educator = await this.findEducatorOrFail(id);
        return educator;
    }

    public async getEditableEducator(id: string){
        await this.findEducatorOrFail(id);
        return await Educator.query().select('id', 'name', 'birthdate', 'avatar').where('id', id).first();    
    }

    public async updateEducator(educator: Educator, updateEducatorPayload: object){
        return await educator.merge(updateEducatorPayload).save()
    }

    public async deleteEducator(id: string){
        const educator = await this.findEducatorOrFail(id);
        return educator.delete();
    }

    private async findEducatorOrFail(id: string){
        const educator = Educator.find(id);
        if(!educator) throw new NotFoundException('Educator not found');
        return educator;
    }
}