import Educator from "App/Models/Educator";

export default class EducatorsService {
    

    public async getAll(){
        return Educator.all();
    }
}