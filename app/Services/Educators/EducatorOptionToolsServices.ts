import NotFoundException from "App/Exceptions/NotFoundException";
import EducatorOptionTool from "App/Models/EducatorOptionTool";


export default class EducatorOptionToolsServices {
    async getAll(){
        return await EducatorOptionTool.all();
    }

    async createTool(toolPayload: object){
        return await EducatorOptionTool.create(toolPayload);
    }

    async getById(id: number){
        return await this.findToolOrFail(id);
    }

    async getEditableTool(id: number){
        return await this.findToolOrFail(id);
    }

    async updateTool(id: number, updateToolPayload: object){
        const tool = await this.findToolOrFail(id);
        return await tool.merge(updateToolPayload).save()
    }

    async deleteTool(id: number){
        const tool = await this.findToolOrFail(id);
        return await tool.delete();
    }

    async findToolOrFail(id: number){
        const tool = await EducatorOptionTool.find(id);
        if(!tool) throw new NotFoundException('Tools not found');
        return tool
    }
}