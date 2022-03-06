import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalErrorException from 'App/Exceptions/InternalErrorException';
import Student from 'App/Models/Student';
import CreateStudent from 'App/Validators/CreateStudentValidator';
import UpdateStudent from 'App/Validators/UpdateStudentValidator';
export default class StudentsController {
  public async index() {
    try{
      return await Student.all();
    }catch(err){
      console.error(err);
      throw new InternalErrorException(err, 500);
    }
  }

  public async create({}: HttpContextContract) {
    // Not need be implemented.
  }

  public async store({request}: HttpContextContract) {
    const studentPayload = await request.validate(CreateStudent);
    try{
      return Student.create(studentPayload);
    }catch(err){
      console.error(err);
      throw new InternalErrorException(err, 500);
    }  
  }

  public async show({request}: HttpContextContract) {
    try{
      const id = request.param('id');
      return await Student.findOrFail(id);
    }catch(err){
      console.error(err);
      throw new InternalErrorException(err, 500);
    }  
  }

  public async edit({request}: HttpContextContract) {
    try{
      const id = request.param('id');
      return await Student.query().select('id', 'name', 'birthdate', 'avatar').where('id', id).first();
    }catch(err){
      console.error(err);
      throw new InternalErrorException(err, 500);
    }  
  }

  public async update({request}: HttpContextContract) {
    const studentPayload = await request.validate(UpdateStudent);
    try{
      const id = request.param('id');
      const student = await Student.findOrFail(id);
      return await student.merge(studentPayload).save()
    }catch(err){
      console.error(err);
      throw new InternalErrorException(err, 500);
    }  
  }

  public async destroy({request}: HttpContextContract) {
    try{
      const id = request.param('id');
      const student = await Student.findOrFail(id);
      return student.delete();
    }catch(err){
      console.error(err);
      throw new InternalErrorException(err, 500);
    }
  }
}
