import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorsService from 'App/Services/Educators/EducatorsServices';
import CreateEducatorValidator from 'App/Validators/Educators/CreateEducatorValidator';
import UpdateEducatorValidator from 'App/Validators/Educators/UpdateEducatorValidator';
import { types } from '@ioc:Adonis/Core/Helpers';
import Hash from '@ioc:Adonis/Core/Hash'
import AuthorizationException from 'App/Exceptions/AuthorizationException';

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
    return await this.educatorsService.getById(id);
  }

  public async edit({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.educatorsService.getEditableEducator(id);
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const id = request.param('id');
    const updateEducatorPayload = await request.validate(UpdateEducatorValidator);
    const educator = await this.educatorsService.getById(id);
    await bouncer.authorize('isTheHandledEducator', educator);
    if (updateEducatorPayload.password) {
      const oldPassword = request.only(["old_password"]);

      if ((!oldPassword) || !(types.isString(oldPassword))) {
        throw new AuthorizationException("Old password doesn't match");
      }

      const authenticated = await Hash.verify(educator.password, oldPassword);
      if (!authenticated) {
        throw new AuthorizationException("Old password doesn't match");
      }
    }

    return await this.educatorsService.updateEducator(educator, updateEducatorPayload)
  }

  public async destroy({ request, bouncer }: HttpContextContract) {
    const id = request.param('id');
    const educator = await this.educatorsService.getById(id);
    await bouncer.authorize('isTheHandledEducator', educator);
    return await this.educatorsService.deleteEducator(id);
  }
}
