import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorContactMean from "App/Models/EducatorContactMean";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class EducatorContactMeansServices{
    async storeContactMean(educator: Educator, contactMeanPayload: object, id: number|undefined = undefined){
        if(!(id)){
            return await educator.related('contactMeans').create(contactMeanPayload);
        }
        return await educator.related('contactMeans').updateOrCreate({ id: id, educator_id: educator.id }, contactMeanPayload);       
    }

    async getByEducatorId(educatorId: string){
        const educatorLoaded: Educator|null = await Educator.find(educatorId)
        if(!(educatorLoaded)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return await educatorLoaded.related('contactMeans').query()
    }

    async delete(id: number){
        const contactMean = await EducatorContactMean.find(id)
        if(!contactMean) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.contact_mean_not_found'))
        return await contactMean.delete()
    }
}