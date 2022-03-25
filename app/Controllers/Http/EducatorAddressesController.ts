import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorAdressServices from 'App/Services/Educators/EducatorAddressServices';
import CreateEducatorAddressValidator from 'App/Validators/Educators/CreateEducatorAddressValidator';

export default class EducatorAddressesController {
  private educatorAddressService: EducatorAdressServices;

  constructor(){
    this.educatorAddressService = new EducatorAdressServices();
  }

  public async index({}: HttpContextContract) {
    // return this.educatorAddressService.getAll();
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, auth }: HttpContextContract) {
    const addressPayload = request.validate(CreateEducatorAddressValidator);
    const educator = auth.educator;
    // return await this.educatorAddressService.createAddressToStudent(addressPayload, educator);
  }

  public async show({ request, auth }: HttpContextContract) {
    const educator = auth.educator;
    return await this.educatorAddressService.getById(educator.id);
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
