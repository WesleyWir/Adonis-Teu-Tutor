import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorContactMean from "App/Models/EducatorContactMean";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class EducatorContactMeansServices {
    async storeContactMean(educator: Educator, contactMeanPayload: any) {
        console.log(await this.getByEducatorId(educator.id))
        if (!(await (await this.getByEducatorId(educator.id)).length)) {
            return await educator.related('contactMeans').createMany(contactMeanPayload.means);
        }
        return await educator.related('contactMeans').updateOrCreateMany(contactMeanPayload.means, 'id');
    }

    async getByEducatorId(educatorId: string) {
        const educatorLoaded: Educator | null = await Educator.find(educatorId)
        if (!(educatorLoaded)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        return await educatorLoaded.related('contactMeans').query().orderBy('id', 'asc')
    }

    async delete(id: number) {
        const contactMean = await EducatorContactMean.find(id)
        if (!contactMean) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.contact_mean_not_found'))
        return await contactMean.delete()
    }
}