import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorOptionToolsServices from 'App/Services/Educators/EducatorOptionToolsServices'
import StoreOptionToolValidator from 'App/Validators/Educators/Option-Tools/StoreOptionToolValidator';
import UpdateOptionToolValidator from 'App/Validators/Educators/Option-Tools/UpdateOptionToolValidator';

export default class EducatorOptionToolsController {
  private _educatorOptionToolServices: EducatorOptionToolsServices

  constructor() {
    this._educatorOptionToolServices = new EducatorOptionToolsServices();
  }

  public async index({ }: HttpContextContract) {
    return this._educatorOptionToolServices.getAll();
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request }: HttpContextContract) {
    const toolPayload = await request.validate(StoreOptionToolValidator);
    return await this._educatorOptionToolServices.createTool(toolPayload);
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this._educatorOptionToolServices.getById(id);
  }

  public async edit({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this._educatorOptionToolServices.getEditableTool(id);
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id');
    const toolPayload = await request.validate(UpdateOptionToolValidator);
    return await this._educatorOptionToolServices.updateTool(id, toolPayload);
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this._educatorOptionToolServices.deleteTool(id);
  }
}
