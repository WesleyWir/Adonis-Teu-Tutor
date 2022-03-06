import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import { randomBytes } from 'crypto';
import { promisify } from 'util'
import Student from 'App/Models/Student';
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator';
import NotFoundException from 'App/Exceptions/NotFoundException';
import Env from '@ioc:Adonis/Core/Env'

export default class StudentsPasswordController {
    public async forgotPassword({ request }: HttpContextContract) {
        const reqPayload = await request.validate(ForgotPasswordValidator)
        const { email } = reqPayload;
        const student = await Student.findBy('email', email);

        if(!(student)){
          throw new NotFoundException('Student not found');
        }

        const random = await promisify(randomBytes)(24);
        const token = random.toString('hex');
        await student.related('tokens').updateOrCreate({ studentId: student.id }, {token,});

        return await Mail.send((message) => {
            let data = {reset_url: Env.get('FRONT_URL')+'/students/reset/', token: token};
            message.from('no-reply@teututor.com')
                .to(email)
                .subject('TeuTutor: Recuperação de senha.')
                .htmlView('emails/forgotpassword', data);
        })
    }
}
