import StudentPost from "App/Models/StudentPost";

export default class QueryPostsService {
    private query;

    public constructor() {
        this.query = StudentPost.query().preload('student').preload('subject');
    }

    public async setOrder(orderBy: string, order: string){
        return this.query.orderBy(orderBy, order);
    }

    public async setSearch(search: string){
        return this.query.where('title', '%'+search+'%');
    }

    public async setPagination(limit: number, page: number){
        return this.query.paginate(page, limit);
    }

    public async execute(){
        return await this.query;
    }
}