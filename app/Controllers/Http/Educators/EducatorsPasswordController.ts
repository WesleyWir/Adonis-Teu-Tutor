import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HandleEducatorPasswordService from 'App/Services/Educators/HandleEducatorPasswordService';
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator';
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator';

export default class EducatorsPasswordController {
    private _handlePasswordService: HandleEducatorPasswordService;

    public constructor() {
        this._handlePasswordService = new HandleEducatorPasswordService();
    }

    public async forgotPassword({ request }: HttpContextContract) {
        const reqPayload = await request.validate(ForgotPasswordValidator)
        const { email } = reqPayload;
        return await this._handlePasswordService.handleForgotPassword(email);
    }

    public async resetPassword({ request }: HttpContextContract){
        const { token, password } = await request.validate(ResetPasswordValidator)
        return await this._handlePasswordService.handleResetPassword(token, password)
    }
}
