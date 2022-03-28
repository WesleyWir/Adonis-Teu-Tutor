import Educator from "App/Models/Educator";
import EducatorAdress from "App/Models/EducatorAdress";

export default class EducatorAdressServices{
    
    async createAddressToStudent(addressPayload: object, educator: Educator){
        const address = await EducatorAdress.create(addressPayload);
        await address.related('educators').attach([educator.id]);
        return await address;
    }
}