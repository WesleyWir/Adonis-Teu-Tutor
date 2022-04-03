import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorOnlineServices from 'App/Services/Educators/EducatorOnlineServices';
import StoreEducatorOnlineValidator from 'App/Validators/Educators/StoreEducatorOnlineValidator';

export default class EducatorOnlineController {
    private _educatorOnlineService: EducatorOnlineServices;

    constructor(){
        this._educatorOnlineService = new EducatorOnlineServices()
    }

    async show({ request }: HttpContextContract){
        const educatorId = request.param('educator_id');
        return await this._educatorOnlineService.getFromEducator(educatorId); 
    }

    async store({ request, auth }: HttpContextContract){
        const educatorOnlinePayload = await request.validate(StoreEducatorOnlineValidator)
        const educator = auth.user;
        return await this._educatorOnlineService.storeOrUpdateOnlineToEducator(educator, educatorOnlinePayload); 
    }

    async update({ request, auth }: HttpContextContract){
        const id = request.param('id')
        const educatorOnlinePayload = await request.validate(StoreEducatorOnlineValidator)
        const educator = auth.user;
        return await this._educatorOnlineService.storeOrUpdateOnlineToEducator(educator, educatorOnlinePayload, id); 
    }

    async destroy({ request }: HttpContextContract){
        const id = request.param('id')
        return await this._educatorOnlineService.delete(id)
    }
}
