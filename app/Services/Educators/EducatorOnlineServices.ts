import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorOnline from "App/Models/EducatorOnline";
import EducatorOptionTool from "App/Models/EducatorOptionTool";
import I18nSingleton from "App/Services/Singletons/I18nSingleton";

export default class EducatorOnlineServices{

    async storeOrUpdateOnlineToEducator(educator: Educator|undefined, educatorOnlinePayload: object, id: number|undefined = undefined): Promise<EducatorOnline>{
        const { option_tool } = educatorOnlinePayload;
        const optionToolFounded = await EducatorOptionTool.find(option_tool)
        if(!(optionToolFounded)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.tool_not_found'));
        if(!(educator)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));

        if(!(id)){
            return await this.store(educator, optionToolFounded, educatorOnlinePayload.target)
        }

        return await this.update(educator, id, optionToolFounded, educatorOnlinePayload.target)
    }

    async store(educatorRelated: Educator, optionToolRelated: EducatorOptionTool, target: string): Promise<EducatorOnline>{
        const educatorOnline = await EducatorOnline.create({ target });
        await educatorOnline.related('educator').associate(educatorRelated)
        await educatorOnline.related('educatorOptionTool').associate(optionToolRelated)
        return educatorOnline;
    }

    async update(educator: Educator, id: number, optionToolRelated: EducatorOptionTool, target: string): Promise<EducatorOnline>{
        const educatorOnline = await EducatorOnline.query().where('id', id).andWhere('educator_id', educator.id).first()
        if(!educatorOnline) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.relation_not_exist'));
        await educatorOnline.related('educatorOptionTool').associate(optionToolRelated)
        return await educatorOnline.merge({ target }).save()
    }

    async getFromEducator(id: string){
        const educator = await Educator.find(id)
        if(!educator) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return educator.related('onlineTools').query().preload('educatorOptionTool')
    }

    async delete(id: number){
        const educatorOnline = await this.findEducatorOnlineOrFail(id);
        return await educatorOnline.delete()
    }

    async findEducatorOnlineOrFail(id: number): Promise<EducatorOnline>{
        const educatorOnline = await EducatorOnline.find(id);
        if(!educatorOnline) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.relation_not_exist'));
        return educatorOnline
    }

}