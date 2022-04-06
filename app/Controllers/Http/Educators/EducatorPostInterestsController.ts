import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Educator from 'App/Models/Educator';
import EducatorPostInterestService from 'App/Services/Educators/EducatorPostInterestService';

export default class EducatorPostInterestsController {
    private _educatorPostInterestService: EducatorPostInterestService;

    constructor(){
        this._educatorPostInterestService = new EducatorPostInterestService()
    }

    async store({ request, auth }: HttpContextContract){
        const educator: Educator = auth.user;
        const postId: string = request.param('id')
        return await this._educatorPostInterestService.interestToPost(postId, educator);
    }

    async destroy({ request, auth }: HttpContextContract){
        const educator: Educator = auth.user;
        const postId: string = request.param('id')
        return await this._educatorPostInterestService.removeInterestToPost(postId, educator);
    }
}
