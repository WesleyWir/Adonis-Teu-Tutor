import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducatorAdressServices from 'App/Services/Educators/EducatorAddressServices';
import CreateEducatorAddressValidator from 'App/Validators/Educators/CreateEducatorAddressValidator';

export default class EducatorAddressesController {
  private educatorAddressService: EducatorAdressServices;

  constructor(){
    this.educatorAddressService = new EducatorAdressServices();
  }

  public async index({}: HttpContextContract) {
    return await this.educatorAddressService.distinctAllAttributes();
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, auth }: HttpContextContract) {
    const addressPayload = await request.validate(CreateEducatorAddressValidator);
    const educator = auth.user;
    return await this.educatorAddressService.createAddressToStudent(addressPayload, educator);
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.educatorAddressService.getByEducatorId(id);
  }

  public async edit({ request }: HttpContextContract) {
    const id = request.param('id');
    return await this.educatorAddressService.getByEducatorId(id);
  }

  public async update({ request, auth }: HttpContextContract) {
    const educator = auth.user;
    const id = request.param('id');
    const addressPayload = await request.validate(CreateEducatorAddressValidator);
    return await this.educatorAddressService.updateAddress(educator, id, addressPayload);
  }

  public async destroy({ request, auth }: HttpContextContract) {
    const educator = auth.user;
    const id = request.param('id');
    return await this.educatorAddressService.deleteAddress(educator, id);
  }
}
