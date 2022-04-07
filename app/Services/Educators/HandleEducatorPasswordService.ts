import NotFoundException from "App/Exceptions/NotFoundException";
import Educator from "App/Models/Educator";
import MailSenderService from "App/Services/MailSenderService";
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import Env from '@ioc:Adonis/Core/Env'
import TokenExpiredException from "App/Exceptions/TokenExpiredException";
import I18nSingleton from "../Singletons/I18nSingleton";

export default class HandleEducatorPasswordService{
    async handleForgotPassword(email: string){
        const educator = await Educator.findBy('email', email);

        if(!(educator)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.educator_not_found'));

        const random = await promisify(randomBytes)(24);
        const token = random.toString('hex');
        await educator.related('tokens').updateOrCreate({ educatorId: educator.id }, {token,});

        const data = {reset_url: `${Env.get('FRONT_URL')}/educators/reset`, token: token};
        let mailSender = new MailSenderService('no-reply@teututor.com', email, 'TeuTutor: Recuperação de senha.', 'emails/forgotpassword');
        mailSender.setData(data);
        return mailSender.execute();
    }

    async handleResetPassword(token: string, password: string){
        const educatorByToken = await Educator.query().whereHas('tokens', (query) => {query.where('token', token);}).preload('tokens').first();

        if(!(educatorByToken)) throw new NotFoundException(I18nSingleton.getInstance().executeFormatMessage('messages.password_reset_request_not_found'));

        const tokenAge = educatorByToken.tokens[0].createdAt.diffNow('hours').hours;

        if(tokenAge > 2) throw new TokenExpiredException();

        educatorByToken.password = password;
        await educatorByToken.save();
        await educatorByToken.tokens[0].delete();
        return {
            message: 'Password has changed',
            email: educatorByToken.email,
            redirectTo: '/educators/login/'
        }
    }
}