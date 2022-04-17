import StudentPost from 'App/Models/StudentPost';
import Student from 'App/Models/Student';
import Subject from 'App/Models/Subject';
import NotFoundException from 'App/Exceptions/NotFoundException';
import QueryPostsService from './QueryPostsService';
import IGetAllPosts from 'App/Interfaces/Students/IGetAllPosts';
import I18nSingleton from '../Singletons/I18nSingleton';


export default class StudentPostsService {
    public async getAllPosts({ orderBy, order, search, limit, page, subject }: IGetAllPosts) {
        let queryPosts = new QueryPostsService();
        if  (search) await queryPosts.setSearch(search);
        if  (subject)   await queryPosts.setPostBySubject(subject);
        if  (orderBy && order) await queryPosts.setOrder(orderBy, order);
        if  (limit && page) await queryPosts.setPagination(limit, page);
        return await queryPosts.execute();
    }

    public async getPostById(id: string) {
        await this.findPostOrFail(id);
        return await StudentPost.query().where('id', id).andWhere('status', true).preload('student').preload('subject');
    }

    public async getPostByEducator(studentId: string, { orderBy, order, search, limit, page, subject }: IGetAllPosts){
        const student = await Student.find(studentId);
        if (!student) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.student_not_found'));
        let queryPosts = new QueryPostsService();
        queryPosts.setStudent(student.id);
        if  (search) await queryPosts.setSearch(search);
        if  (subject)   await queryPosts.setPostBySubject(subject);
        if  (orderBy && order) await queryPosts.setOrder(orderBy, order);
        if  (limit && page) await queryPosts.setPagination(limit, page);
        return await queryPosts.execute();
    }

    public async createPost({ postPayload, student }: { postPayload: { title, content, subject }; student: Student; }) {
        if (!(postPayload.subject)) {
            return await this.createPostWithoutSubject(postPayload, student);
        }

        const subject = await Subject.find(postPayload.subject);

        if (!subject) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.subject_not_found'));

        return await this.createPostWithSubject(postPayload, student, subject);
    }

    private async createPostWithoutSubject(postPayload: { title, content, subject }, student: Student) {
        return await student.related('posts').create(postPayload);
    }

    private async createPostWithSubject(postPayload: { title, content, subject }, student: Student, subject: Subject) {
        let studentPost = new StudentPost();
        studentPost.title = postPayload.title;
        studentPost.content = postPayload.content;
        await studentPost.related('student').associate(student);
        await studentPost.related('subject').associate(subject);
        return await studentPost.save();
    }

    public async updatePost({ postPayload, postId, student }: { postPayload: { title, content, subject }; postId: string; student: Student; }){
        const post = await this.findPostOrFail(postId)

        if (!(postPayload.subject)) {
            return await this.updatePostWithoutSubject(postPayload, post);
        }

        const subject = await Subject.find(postPayload.subject);
        if (!subject) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.subject_not_found'));

        return await this.updatePostWithSubject(postPayload, subject, post);
    }

    private async updatePostWithoutSubject(postPayload: { title, content, subject }, post: StudentPost) {
        return await post.merge(postPayload).save();
    }

    private async updatePostWithSubject(postPayload: { title, content, subject }, subject: Subject, post: StudentPost) {
        await post.related('subject').associate(subject);
        return await post.merge(postPayload).save();
    }

    public async getEditPostOptions(id: string){
        const post = await this.findPostOrFail(id);
        return post;
    }

    public async delete(id:string){
        const post = await this.findPostOrFail(id);        
        return await post.delete();
    }

    private async findPostOrFail(id: string){
        const post = await StudentPost.find(id);
        if (!post) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.post_not_found'));
        return post;
    }
}