import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Educator from 'App/Models/Educator';
import Student from 'App/Models/Student';
import Application from '@ioc:Adonis/Core/Application'
import AvatarValidator from 'App/Validators/AvatarValidator';
import Drive from '@ioc:Adonis/Core/Drive'
import BadRequestException from 'App/Exceptions/BadRequestException';

export default class AvatarsController {
    async store({ request, auth }: HttpContextContract) {
        const { avatar } = await request.validate(AvatarValidator);
        const user: Student|Educator|undefined = auth.user;
        if(user.avatar) await Drive.delete(Application.publicPath(user.avatar)); 
        await avatar.moveToDisk('./avatar/');
        user.avatar = avatar.filePath?.replace(Application.publicPath(), '');
        return user.save();
    }

    async destroy({ auth, i18n }: HttpContextContract){
        const user: Student|Educator|undefined = auth.user;
        if(!(user.avatar)) throw new BadRequestException(i18n.formatMessage('messages.user_avatar_not_exist'));
        await Drive.delete(Application.publicPath(user.avatar));
        user.avatar = null;
        return await user.save();
    }
}
