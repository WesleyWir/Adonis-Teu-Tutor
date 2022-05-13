import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import EducatorContactMeansServices from 'App/Services/Educators/EducatorContactMeansServices'
import StoreEducatorContactMeanValidator from 'App/Validators/Educators/StoreEducatorContactMeanValidator'

export default class EducatorsContactMeansController {
    private _educatorContactMeansService: EducatorContactMeansServices

    constructor(){
        this._educatorContactMeansService = new EducatorContactMeansServices()
    }

    async store({ request, auth }: HttpContextContract){
        const contactMeanPayload = await request.validate(StoreEducatorContactMeanValidator)
        const educator = auth.user
        return await this._educatorContactMeansService.storeContactMean(educator, contactMeanPayload)
    }

    async show({ request }: HttpContextContract){
        const educatorId = request.param('educator_id')
        return await this._educatorContactMeansService.getByEducatorId(educatorId)
    }

    async update({ request, auth }: HttpContextContract){
        const contactMeanPayload = await request.validate(StoreEducatorContactMeanValidator)
        const educator = auth.user
        return await this._educatorContactMeansService.storeContactMean(educator, contactMeanPayload)
    }

    async destroy({ request, bouncer, auth, i18n }: HttpContextContract){
        const id = request.param('id')
        const educator = auth.user;
        if(!educator) throw new NotFoundException(i18n.formatMessage('messages.educator_not_found'))
        await bouncer.authorize('isTheHandledEducator', educator)
        return await this._educatorContactMeansService.delete(id)
    }
}
