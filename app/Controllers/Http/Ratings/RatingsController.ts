import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Educator from 'App/Models/Educator';
import Student from 'App/Models/Student';
import RatingsService from 'App/Services/Ratings/RatingsService';
import StoreRatingValidator from 'App/Validators/Ratings/StoreRatingValidator';
import EducatorsService from "App/Services/Educators/EducatorsServices";
import EducatorRating from 'App/Models/EducatorRating';

export default class RatingsController {
    private _ratingsService: RatingsService;

    constructor(){
        this._ratingsService = new RatingsService()
    }
    async store({ request, auth }: HttpContextContract){
        const student: Student = auth.user
        const educator_id = await request.param('educator_id')
        const ratingsPayload = await request.validate(StoreRatingValidator)
        return await this._ratingsService.storeRate(student, educator_id, ratingsPayload)
    }

    async hasClass({ request, auth }: HttpContextContract){
        const student: Student = auth.user
        const educatorId = await request.param('educator_id')
        const educatorService = new EducatorsService();
        const educator: Educator = await educatorService.getById(educatorId)
        return await this._ratingsService.hasClassRelated(student, educator)
    }

    async show({ request }: HttpContextContract){
        const id = await request.param('educator_id')
        const ratings = await EducatorRating.query().where('educator_id', id).preload('student');
        return ratings
    }

    async destroy({ request, auth }: HttpContextContract){
        const student: Student = auth.user
        const id = await request.param('id')
        return await this._ratingsService.deleteRate(id)
    }
}