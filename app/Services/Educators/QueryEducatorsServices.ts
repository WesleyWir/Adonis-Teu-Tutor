import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import Educator from "App/Models/Educator"

export default class QueryEducatorsServices {
    private query: ModelQueryBuilderContract<typeof Educator, Educator>

    constructor() {
        this.query = Educator.query().where('status', true).preload('addresses').preload('classType').preload('subject')
    }

    async setSearch(search: string){
        return this.query.andWhere('name', 'like', `%${search}%`)
    }

    async setSubject(subjectId: number) {
        return this.query.andWhere('subject_id', subjectId)
    }

    async setPagination(limit: number, page: number) {
        return this.query.paginate(page, limit);
    }

    async setCity(city: string) {
        return this.query.andWhereHas('addresses', (addressQuery) => {
            addressQuery.andWhere('city', 'LIKE', `%${city}%`)
        })
    }

    async setNeigborhood(neighborhood: string) {
        return this.query.andWhereHas('addresses', (addressQuery) => {
            addressQuery.andWhere('neighborhood', 'LIKE', `%${neighborhood}%`)
        })
    }

    async setOnline() {
        return this.query.andWhere('type', 'online')
    }

    public async setOrder(orderBy: string, order: string) {
        return this.query.orderBy(orderBy, order);
    }

    async execute() {
        return await this.query
    }
}