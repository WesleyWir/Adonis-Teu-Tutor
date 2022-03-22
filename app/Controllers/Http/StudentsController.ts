import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentsService from 'App/Services/Students/StudentsService';
import CreateStudent from 'App/Validators/Students/CreateStudentValidator';
import UpdateStudent from 'App/Validators/Students/UpdateStudentValidator';
import { types } from '@ioc:Adonis/Core/Helpers';
import Hash from '@ioc:Adonis/Core/Hash'
import AuthorizationException from 'App/Exceptions/AuthorizationException';
import NotFoundException from 'App/Exceptions/NotFoundException';

export default class StudentsController {
  private studentsService: StudentsService;

  public constructor() {
    this.studentsService = new StudentsService();
  }

  public async index() {
    return await this.studentsService.getAll();
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request }: HttpContextContract) {
    const studentPayload = await request.validate(CreateStudent);
    return await this.studentsService.createStudent(studentPayload);
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.studentsService.getById(id);
  }

  public async edit({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.studentsService.getEditableStudent(id);
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const updateStudentPayload = await request.validate(UpdateStudent);
    const id = request.param('id');
    const student = await this.studentsService.getById(id);
    await bouncer.authorize('isTheHandledStudent', student);

    if (updateStudentPayload.password) {
      const oldPassword = request.only(["old_password"]);

      if ((!oldPassword) || !(types.isString(oldPassword))) {
        throw new AuthorizationException("Old password doesn't match");
      }

      const authenticated = await Hash.verify(student.password, oldPassword);
      if (!authenticated) {
        throw new AuthorizationException("Old password doesn't match");
      }
    }

    return await this.studentsService.updateStudent(student, updateStudentPayload);
  }

  public async destroy({ request, bouncer }: HttpContextContract) {
    const id = request.param('id');
    const student = await this.studentsService.getById(id);
    await bouncer.authorize('isTheHandledStudent', student);
    return await this.studentsService.deleteStudent(id)
  }
}
