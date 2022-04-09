import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Educator from 'App/Models/Educator';
import PixServices from 'App/Services/Payments/PixServices'
import StorePixValidator from 'App/Validators/Payments/StorePixValidator';

export default class EducatorsPixController {
    private _pixServices: PixServices;

    async show({ request }: HttpContextContract){
        const educatorId: string = request.param('educator_id');
        return await this._pixServices.getByEducator(educatorId);
    }

    async store({ request, auth }: HttpContextContract) {
        const educator: Educator = auth.user;
        const pixPayload = await request.validate(StorePixValidator);
        return await this._pixServices.createOrUpdate(educator, pixPayload)
    }

    async destroy({ auth }: HttpContextContract) {
        const educator: Educator = auth.user;
        return await this._pixServices.delete(educator);
    }
}
