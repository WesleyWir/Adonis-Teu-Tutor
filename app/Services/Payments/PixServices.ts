import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import I18nSingleton from "../Singletons/I18nSingleton";


export default class PixServices {

    async createOrUpdate(educator: Educator, payload: object) {
        return await educator.related('pix').updateOrCreate({ educator_id: educator.id }, payload);
    }

    async delete(educator: Educator) {
        const deleted = await educator.related('pix').query().first();
        if (!deleted) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.pix_not_found'))
        return await deleted.delete();
    }

    async getByEducator(educatorId: string) {
        const educator: Educator | null = await Educator.find(educatorId);
        if (!educator) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'))
        return await educator.related('pix').query().first();
    }
}