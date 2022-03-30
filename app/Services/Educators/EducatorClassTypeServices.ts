import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import EducatorClassType from "App/Models/EducatorClassType";
import { ClassTypes } from "Contracts/enums";

export default class EducatorClassTypeServices {
    async updateOrCreateClassType(educator: Educator, type: ClassTypes) {
        return await educator.related('classType').updateOrCreate({ educatorId: educator.id }, { type });
    }

    async getClassTypeFromEducator(educatorId: string) {
        const educator = await Educator.find(educatorId);
        if(!educator) throw new NotFoundException('Educator not found');
        return await educator.related('classType').query();
    }
}