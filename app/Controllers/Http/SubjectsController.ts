import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException';
import Subject from 'App/Models/Subject';
import StoreSubjectValidator from 'App/Validators/StoreSubjectValidator';
import UpdateSubjectValidator from 'App/Validators/UpdateSubjectValidator';

export default class SubjectsController {
  public async index({ }: HttpContextContract) {
    return await Subject.all();
  }

  public async create({ }: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const subjectPayload = await request.validate(StoreSubjectValidator);
    return Subject.create(subjectPayload);
  }

  public async show({request }: HttpContextContract) { 
    const id = request.param('id');
    const subject = Subject.find(id);

    if(!subject) {
      throw new NotFoundException('Subject not found');
    }

    return await subject;
  }

  public async edit({ request }: HttpContextContract) { 
    const id = request.param('id');
    const subject = Subject.find(id);

    if(!subject) {
      throw new NotFoundException('Subject not found');
    }

    return await subject;
  }

  public async update({ request }: HttpContextContract) { 
    const subjectPayload = await request.validate(UpdateSubjectValidator);
    const id = request.param('id');
    const subject = await Subject.find(id);

    if(!subject){
      throw new NotFoundException('Subject not found');
    } 

    return await subject.merge(subjectPayload).save();
  }

  public async destroy({ request }: HttpContextContract) { 
    const id = request.param('id');
    const subject = await Subject.find(id);

    if(!subject){
      throw new NotFoundException('Subject not found');
    }

    return subject.delete();
  }
}
