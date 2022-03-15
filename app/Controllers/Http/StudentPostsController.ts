import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IGetAllPosts from 'App/Interfaces/Students/IGetAllPosts';
import StudentPostsService from 'App/Services/Students/StudentPostsService';
import IndexStudentPostValidator from 'App/Validators/Students/IndexStudentPostValidator';
import StoreStudentPostValidator from 'App/Validators/Students/StoreStudentPostValidator';
import UpdateStudentPostValidator from 'App/Validators/Students/UpdateStudentPostValidator';

export default class StudentPostsController {
  private studentPostsService: StudentPostsService;

  public constructor() {
    this.studentPostsService = new StudentPostsService();
  }

  public async index({ request }: HttpContextContract) {
    const { orderBy, order, search, limit, page, subject }: IGetAllPosts = await request.validate(IndexStudentPostValidator);
    return await this.studentPostsService.getAllPosts({ orderBy, order, search, limit, page, subject });
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request }: HttpContextContract) {
    const postPayload = await request.validate(StoreStudentPostValidator);
    const studentId = request.param('studentId');
    // await bouncer.authorize('isTheHandledStudent', student);
    return await this.studentPostsService.createPost({ postPayload, studentId });
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return this.studentPostsService.getPostById(id);
  }

  public async edit({ request }: HttpContextContract) { 
    const id = request.param('id');
    return this.studentPostsService.getEditPostOptions(id);
  }

  public async update({ request }: HttpContextContract) { 
    const postPayload = await request.validate(UpdateStudentPostValidator);
    const postId = request.param('id');
    const studentId = request.param('studentId');
    // await bouncer.authorize('isTheHandledStudent', student);
    return await this.studentPostsService.updatePost({ postPayload, postId, studentId });
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.studentPostsService.delete(id);
  }
}
