import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorClassTypeServices from 'App/Services/Educators/EducatorClassTypeServices';
import StoreEducatorClassTypeValidator from 'App/Validators/Educators/StoreEducatorClassTypeValidator';

export default class EducatorClassTypesController {
  private _educatorClassTypeService: EducatorClassTypeServices;

  constructor() {
    this._educatorClassTypeService = new EducatorClassTypeServices('classType');
  }

  public async store({ request, auth }: HttpContextContract) {
    const classTypePayload = await request.validate(StoreEducatorClassTypeValidator);
    return await this._educatorClassTypeService.updateOrCreate(auth.user, classTypePayload.type);
  }

  public async show({ request }: HttpContextContract) {
    const educatorId: string = request.param('id');
    return await this._educatorClassTypeService.getByEducatorId(educatorId);
  }
}
