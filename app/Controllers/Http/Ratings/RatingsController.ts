import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student';
import RatingsService from 'App/Services/Ratings/RatingsService';
import StoreRatingValidator from 'App/Validators/Ratings/StoreRatingValidator';

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

    async update({ request, auth }: HttpContextContract){
        
    }

    async destroy({ request, auth }: HttpContextContract){
        const student: Student = auth.user
        const id = await request.param('id')
        return await this._ratingsService.deleteRate(id)
    }