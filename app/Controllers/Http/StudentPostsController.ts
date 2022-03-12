import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException';
import IGetAllPosts from 'App/Interfaces/Students/IGetAllPosts';
import StudentPost from 'App/Models/StudentPost';
import StudentPostsService from 'App/Services/Students/StudentPostsService';
import IndexStudentPostValidator from 'App/Validators/IndexStudentPostValidator';
import StoreStudentPostValidator from 'App/Validators/StoreStudentPostValidator';

export default class StudentPostsController {
  private studentPostsService: StudentPostsService;

  public constructor() {
    this.studentPostsService = new StudentPostsService();
  }

  public async index({ request }: HttpContextContract) {
    const { orderBy, order, search, limit, page }: IGetAllPosts = await request.validate(IndexStudentPostValidator);
    return await this.studentPostsService.getAllPosts({ orderBy, order, search, limit, page });
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request }: HttpContextContract) {
    const postPayload = await request.validate(StoreStudentPostValidator);
    const studentId = request.param('studentId');
    return await this.studentPostsService.createPost({ postPayload, studentId });
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return this.studentPostsService.getPostById(id);
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.studentPostsService.delete(id);
  }

  public async filterBySubject({ request }: HttpContextContract) {
    const subjectId = request.param('subjectId');
    return await this.studentPostsService.getPostsBySubject(subjectId);
  }

}
