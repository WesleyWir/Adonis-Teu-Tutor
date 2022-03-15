import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorsService from 'App/Services/Educators/EducatorsServices';
import CreateEducatorValidator from 'App/Validators/Educators/CreateEducatorValidator';
import UpdateEducatorValidator from 'App/Validators/Educators/UpdateEducatorValidator';

export default class EducatorsController {
  private educatorsService: EducatorsService;

  public constructor() {
    this.educatorsService = new EducatorsService();
  }

  public async index({}: HttpContextContract) {
    return await this.educatorsService.getAll();
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const educatorPayload = await request.validate(CreateEducatorValidator);
    return await this.educatorsService.createEducator(educatorPayload);
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.educatorsService.showEducator(id);
  }

  public async edit({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.educatorsService.getEditableEducator(id);
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.educatorsService.deleteEducator(id);
  }
}
