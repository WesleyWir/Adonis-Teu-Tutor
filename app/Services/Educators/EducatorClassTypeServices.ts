import { ExtractModelRelations } from "@ioc:Adonis/Lucid/Orm";
import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import { ClassTypes, InPersonTypes } from "Contracts/enums";

export default class EducatorClassTypeServices {
    private _relatedTable: ExtractModelRelations<Educator>;

    constructor(relatedTable: ExtractModelRelations<Educator>){
        this._relatedTable = relatedTable;
    }

    async updateOrCreate(educator: Educator, type: (ClassTypes|InPersonTypes)) {
        const relation: any = educator.related(this._relatedTable);
        if(!relation) throw Error('Relation requested not exist');
        return relation.updateOrCreate({ educatorId: educator.id }, { type });
    }

    async getByEducatorId(educatorId: string) {
        const educator = await Educator.find(educatorId);
        if(!educator) throw new NotFoundException('Educator not found');
        const relation: any = educator.related(this._relatedTable);
        return await relation.query();
    }
}