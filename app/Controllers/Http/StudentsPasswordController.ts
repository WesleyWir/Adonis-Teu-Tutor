import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HandleStudentPasswordService from 'App/Services/Students/HandleStudentPasswordService';
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator';
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator';

export default class StudentsPasswordController {
    private _handlePasswordService: HandleStudentPasswordService;

    public constructor() {
        this._handlePasswordService = new HandleStudentPasswordService();
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
