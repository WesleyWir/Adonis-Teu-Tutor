import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorAdress from "App/Models/EducatorAddress";

export default class EducatorAdressServices{
    
    async getAll(){
        return await EducatorAdress.query().distinct('country', 'region', 'city', 'neighborhood');
    }

    async createAddressToStudent(addressPayload: object, educator: Educator){
        const allreadyAddress = await this.getByEducatorId(educator.id);
        if(allreadyAddress.length >= 1){
            return await this.updateAddress(educator, allreadyAddress[0].id, addressPayload);
        }
        const address = await EducatorAdress.create(addressPayload);
        await address.related('educators').attach([educator.id]);
        return address;
    }

    async getByEducatorId(educatorId: string){
        const educator = await Educator.find(educatorId);
        if(!educator) throw new NotFoundException('Educator not found');
        return educator.related('addresses').query();
    }

    async distinctAllAttributes(){
        let attributes: object = {};
        const attributesNames = ['country', 'region', 'city', 'neighborhood'];
        for (const attr of attributesNames) {
            attributes[attr] = await EducatorAdress.query().distinct(attr); 
        }
        return attributes;
    }

    async updateAddress(educator: Educator, addressId: number, addressPayload: object){
        let address = await educator.related('addresses').query().first();
        if(!address) throw new NotFoundException('Address not found');
        return await address.merge(addressPayload).save();
    }

    async deleteAddress(educator: Educator, addressId: number){
        let address = await educator.related('addresses').query().first();
        if(!address) throw new NotFoundException('Address not found');
        return await address.delete();
    }

    async distinctCountries(){
        return await EducatorAdress.query().distinct('country');
    }

    async distinctRegionsByCountry(country: string){
        return await EducatorAdress.query().where('country', country).distinct('region');
    }

    async distinctCityByRegion(region: string){
        return await EducatorAdress.query().where('region', region).distinct('city');
    }

    async distinctNeighborhoodByCity(city: string){
        return await EducatorAdress.query().where('city', city).distinct('neighborhood');
    }
}