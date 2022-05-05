import EducatorQueries from "App/Interfaces/Educators/EducatorQueries"

export default class EducatorListService{
    private queries: EducatorQueries
    private query;

    public constructor(queries: EducatorQueries){
        this.queries = queries;
    }

    async process(){
        if  (this.queries.search) await this.setSearch(this.queries.search);
        if  (this.queries.subject)   await this.setEducatorsBySubject(this.queries.subject);
        if  (this.queries.orderBy && this.queries.order) await this.setOrder(this.queries.orderBy, this.queries.order);
        if  (this.queries.limit && this.queries.page) return await this.setPagination(this.queries.limit, this.queries.page);
        return await this.query;
    }

    async setOrder(orderBy: string, order: string) {
        return this.query.orderBy(orderBy, order);
    }

    async setSearch(search: string) {
        // TODO        
    }

    async setPagination(limit: number, page: number) {
        return this.query.paginate(page, limit);
    }

    async setEducatorsBySubject(subjectId: number) {
        // TODO
    }

    async setCountry(country: string) {
        // TODO
    }

    async setRegion(region: string) {
        // TODO
    }

    async setCity(city: string) {
        // TODO
    }
}