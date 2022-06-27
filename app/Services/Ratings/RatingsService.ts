import NotFoundException from "App/Exceptions/NotFoundException";
import Class from "App/Models/Class";
import Educator from "App/Models/Educator";
import EducatorRating from "App/Models/EducatorRating";
import Student from "App/Models/Student";
import EducatorsService from "../Educators/EducatorsServices";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class RatingsService {
    async storeRate(student: Student, educatorId: string, ratingPayload: object) {
        const educatorService = new EducatorsService();
        const educator: Educator = await educatorService.getById(educatorId)

        if(!await this.hasClassRelated(student, educator)){
            throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_student_not_has_class'));
        }

        const ratingFinded = await EducatorRating.query().where('student_id', student.id).andWhere('educator_id', educator.id).first()
        if(ratingFinded){
            return await ratingFinded.merge(ratingPayload).save();
        }

        const rating = await EducatorRating.create(ratingPayload);
        await rating.related('educator').associate(educator)
        await rating.related('student').associate(student)
        return await rating.save()
    }
    
    async updateRate(ratingId: number, ratingPayload: object){
        const rating = await EducatorRating.find(ratingId)
    }

    async deleteRate(rating_id: number) {
        return await (await EducatorRating.findOrFail(rating_id)).delete()
    }

    async hasClassRelated(student: Student, educator: Educator) {
        const searchQuery = await Class.query().where('student_id', student.id).andWhere('educator_id', educator.id).count('id');
        return new Boolean(searchQuery)
    }
}