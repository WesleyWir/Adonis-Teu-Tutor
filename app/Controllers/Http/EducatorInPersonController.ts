import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorClassTypeServices from 'App/Services/Educators/EducatorClassTypeServices';
import StoreEducatorInPersonValidator from 'App/Validators/Educators/StoreEducatorInPersonValidator';

export default class EducatorInPersonController {
    private _educatorClassTypeService: EducatorClassTypeServices;

    constructor(){
        this._educatorClassTypeService = new EducatorClassTypeServices('inPerson');
    }

    async store({ request, auth }: HttpContextContract){
        const inPersonPayload = await request.validate(StoreEducatorInPersonValidator);
        return await this._educatorClassTypeService.updateOrCreate(auth.user, inPersonPayload.type)
    }

    public async show({ request }: HttpContextContract) {
        const educatorId: string = request.param('id');
        return await this._educatorClassTypeService.getByEducatorId(educatorId);
    }
}
