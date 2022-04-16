import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IGetAllPosts from 'App/Interfaces/Students/IGetAllPosts';
import Student from 'App/Models/Student';
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

  public async indexStudent({ request }: HttpContextContract){
    const studentId = request.param('student_id')
    return await this.studentPostsService.getPostByEducator(studentId);
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, auth }: HttpContextContract) {
    const postPayload = await request.validate(StoreStudentPostValidator);
    const student: Student = auth.user;
    return await this.studentPostsService.createPost({ postPayload, student });
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.studentPostsService.getPostById(id);
  }

  public async edit({ request }: HttpContextContract) { 
    const id = request.param('id');
    return this.studentPostsService.getEditPostOptions(id);
  }

  public async update({ request, auth, bouncer }: HttpContextContract) { 
    const postPayload = await request.validate(UpdateStudentPostValidator);
    const postId = request.param('id');
    const student: Student = await auth.user;
    return await this.studentPostsService.updatePost({ postPayload, postId, student });
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.studentPostsService.delete(id);
  }
}
