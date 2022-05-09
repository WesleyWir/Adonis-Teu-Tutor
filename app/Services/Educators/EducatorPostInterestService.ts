import BadRequestException from "App/Exceptions/BadRequestException";
import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import StudentPost from "App/Models/StudentPost";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class EducatorPostInterestService{
    StudentPost: any;

    async interestToPost(postId: string, educator: Educator){
        const post = await this.findPostOrFail(postId);
        const educatorAlreadyInterest = await educator.related('postInterest').query().where('student_post_id', post.id)
        if(educatorAlreadyInterest.length) throw new BadRequestException(I18nSingleton.getInstance().executeFormatMessage('messages.already_interest_post'))
        return await educator.related('postInterest').create(post);
    }

    async removeInterestToPost(postId: string, educator: Educator){
        const post = await this.findPostOrFail(postId);
        return await educator.related('postInterest').detach([post.id]);
    }

    async getInterestedEducatorsInPost(postId: string){
        const post = await this.findPostOrFail(postId);
        return await post.related('educators').query()
    }

    async findPostOrFail(postId: string){
        const post = await StudentPost.find(postId);
        if (!post) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.post_not_found'));
        return post
    }

    async educatorHasInterest(postId: string, educatorId: string){
        const post = await this.findPostOrFail(postId);
        return Boolean(await post.related('educators').query().where('educator_id', educatorId).first());
    }
}