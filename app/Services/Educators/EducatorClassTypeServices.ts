import { ExtractModelRelations } from "@ioc:Adonis/Lucid/Orm";
import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import { ClassTypes, InPersonTypes } from "Contracts/enums";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class EducatorClassTypeServices {
    private _relatedTable: ExtractModelRelations<Educator>;

    constructor(relatedTable: ExtractModelRelations<Educator>){
        this._relatedTable = relatedTable;
    }

    async updateOrCreate(educator: Educator, type: (ClassTypes|InPersonTypes)) {
        const relation: any = educator.related(this._relatedTable);
        if(!relation) throw Error(I18nSingleton.getInstance().executeFormatMessage('messages.relation_not_exist'));
        return relation.updateOrCreate({ educatorId: educator.id }, { type });
    }

    async getByEducatorId(educatorId: string) {
        const educator = await Educator.find(educatorId);
        if(!educator) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));
        const relation: any = educator.related(this._relatedTable);
        return await relation.query();
    }
}