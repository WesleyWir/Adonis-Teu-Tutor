import StudentPost from "App/Models/StudentPost";

export default class QueryPostsService {
    private query;

    public constructor() {
        this.query = StudentPost.query().where('status', true).preload('student').preload('subject');
    }

    public async setOrder(orderBy: string, order: string) {
        return this.query.orderBy(orderBy, order);
    }

    public async setSearch(search: string) {
        return this.query
            .join('subjects', 'student_posts.subject_id', '=', 'subjects.id').select('student_posts.*')
            .where('title', 'like', `%${search}%`).orWhere('content', 'like', `%${search}%`).orWhere('subject', 'like', `%${search}%`);
    }

    public async setPagination(limit: number, page: number) {
        return this.query.paginate(page, limit);
    }

    public async setPostBySubject(subjectId: number) {
        return this.query.andWhere('subject_id', '=', subjectId);
    }

    public async execute() {
        return await this.query;
    }
}