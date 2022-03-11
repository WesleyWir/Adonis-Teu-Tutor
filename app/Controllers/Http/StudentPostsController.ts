import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException';
import StudentPost from 'App/Models/StudentPost';
import StudentPostsService from 'App/Services/Students/StudentPostsService';
import StoreStudentPostValidator from 'App/Validators/StoreStudentPostValidator';

export default class StudentPostsController {
  private studentPostsService: StudentPostsService;

  public constructor() {
    this.studentPostsService = new StudentPostsService();
  }

  public async index({ }: HttpContextContract) {
    return await StudentPost.all();
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request }: HttpContextContract) {
    const postPayload = await request.validate(StoreStudentPostValidator);
    const studentId = request.param('studentId');
    return await this.studentPostsService.createPost({ postPayload, studentId });
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }

  public async filterBySubject({ }: HttpContextContract) { }

}
