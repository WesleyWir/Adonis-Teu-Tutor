import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreImageEditorValidator from 'App/Validators/StoreImageEditorValidator'

export default class UploadEditorController {
    async store({ request }: HttpContextContract) {
        const { file } = await request.validate(StoreImageEditorValidator)
        const d = new Date();
        const year = d.getFullYear();
        await file.moveToDisk('./editor/'+year+'/');
        return file.filePath?.replace(Application.publicPath(), '');
    }
}