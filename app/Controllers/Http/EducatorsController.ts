import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorsService from 'App/Services/Educators/EducatorsServices';

export default class EducatorsController {
  private educatorsService: EducatorsService;

  public constructor() {
    this.educatorsService = new EducatorsService();
  }

  public async index({}: HttpContextContract) {
    this.educatorsService.getAll();
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
