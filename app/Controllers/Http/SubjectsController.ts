import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubjectsService from 'App/Services/SubjectsService';
import StoreSubjectValidator from 'App/Validators/StoreSubjectValidator';
import UpdateSubjectValidator from 'App/Validators/UpdateSubjectValidator';

export default class SubjectsController {
  private subjectsService: SubjectsService;

  public constructor() {
    this.subjectsService = new SubjectsService();
  }

  public async index({ }: HttpContextContract) {
    return await this.subjectsService.getAll();
  }

  public async create({ }: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const subjectPayload = await request.validate(StoreSubjectValidator);
    return await this.subjectsService.createSubject(subjectPayload);
  }

  public async show({request }: HttpContextContract) { 
    const id = request.param('id');
    return await this.subjectsService.getById(id);
  }

  public async edit({ request }: HttpContextContract) { 
    const id = request.param('id');
    return await this.subjectsService.getEditableSubject(id);
  }

  public async update({ request }: HttpContextContract) { 
    const updateSubjectPayload = await request.validate(UpdateSubjectValidator);
    const id = request.param('id');
    const subject = await this.subjectsService.getById(id);
    return await this.subjectsService.updateSubject(subject, updateSubjectPayload)
  }

  public async destroy({ request }: HttpContextContract) { 
    const id = request.param('id');
    return await this.subjectsService.deleteSubject(id);
  }
}
