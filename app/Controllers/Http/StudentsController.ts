import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student';
import CreateStudent from 'App/Validators/Students/CreateStudentValidator';
import UpdateStudent from 'App/Validators/Students/UpdateStudentValidator';
import { types } from '@ioc:Adonis/Core/Helpers';
import Hash from '@ioc:Adonis/Core/Hash'
import AuthorizationException from 'App/Exceptions/AuthorizationException';
import NotFoundException from 'App/Exceptions/NotFoundException';

export default class StudentsController {
  public async index() {
    return await Student.all();
  }

  public async create({ }: HttpContextContract) {
    // Not need be implemented.
  }

  public async store({ request }: HttpContextContract) {
    const studentPayload = await request.validate(CreateStudent);
    return Student.create(studentPayload);
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    const student = Student.find(id);

    if(!student) {
      throw new NotFoundException('Student not found');
    }

    return await student;
  }

  public async edit({ request }: HttpContextContract) {
    const id = request.param('id');
    return await Student.query().select('id', 'name', 'birthdate', 'avatar').where('id', id).first();
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const studentPayload = await request.validate(UpdateStudent);
    const id = request.param('id');
    const student = await Student.find(id);

    if(!student) {
      throw new NotFoundException('Student not found');
    }

    await bouncer.authorize('isTheHandledStudent', student);

    if (studentPayload.password) {
      const oldPassword = request.only(["old_password"]);

      if ((!oldPassword) || !(types.isString(oldPassword))) {
        throw new AuthorizationException("Old password doesn't match");
      }

      const authenticated = await Hash.verify(student.password, oldPassword);
      if (!authenticated) {
        throw new AuthorizationException("Old password doesn't match");
      }
    }

    return await student.merge(studentPayload).save()
  }

  public async destroy({ request, bouncer }: HttpContextContract) {
    const id = request.param('id');
    const student = await Student.find(id);

    if(!student) {
      throw new NotFoundException('Student not found');
    }

    await bouncer.authorize('isTheHandledStudent', student);

    return student.delete();
  }
}
