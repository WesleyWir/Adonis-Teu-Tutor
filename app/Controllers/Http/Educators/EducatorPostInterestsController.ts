import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Educator from 'App/Models/Educator';
import Student from 'App/Models/Student';
import EducatorPostInterestService from 'App/Services/Educators/EducatorPostInterestService';
import StudentPostsService from 'App/Services/Students/StudentPostsService';

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

    async show({ request, bouncer }: HttpContextContract){
        const postId = request.param('id');
        const postService: StudentPostsService = new StudentPostsService();
        const handledPost = await postService.getPostById(postId) 
        const student: Student = handledPost.student;
        await bouncer.authorize('isTheHandledStudent', student);
        return await this._educatorPostInterestService.getInterestedEducatorsInPost(postId);
    }
}
