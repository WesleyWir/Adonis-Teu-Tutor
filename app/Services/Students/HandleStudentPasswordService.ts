import NotFoundException from "App/Exceptions/NotFoundException";
import Student from "App/Models/Student";
import MailSenderService from "App/Services/MailSenderService";
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import Env from '@ioc:Adonis/Core/Env'
import TokenExpiredException from "App/Exceptions/TokenExpiredException";

export default class HandleStudentPasswordService{
    async handleForgotPassword(email: string){
        const student = await Student.findBy('email', email);

        if(!(student)) throw new NotFoundException('Student not found');

        const random = await promisify(randomBytes)(24);
        const token = random.toString('hex');
        await student.related('tokens').updateOrCreate({ studentId: student.id }, {token,});

        const data = {reset_url: `${Env.get('FRONT_URL')}/students/reset/`, token: token};
        let mailSender = new MailSenderService('no-reply@teututor.com', email, 'TeuTutor: Recuperação de senha.', 'emails/forgotpassword');
        mailSender.setData(data);
        return mailSender.execute();
    }

    async handleResetPassword(token: string, password: string){
        const studentByToken = await Student.query().whereHas('tokens', (query) => {query.where('token', token);}).preload('tokens').first();

        if(!(studentByToken)) throw new NotFoundException('Request not found. Generate new forgot email and try again.');

        const tokenAge = studentByToken.tokens[0].createdAt.diffNow('hours').hours;

        if(tokenAge > 2) throw new TokenExpiredException();

        studentByToken.password = password;
        await studentByToken.save();
        await studentByToken.tokens[0].delete();
        return {
            message: 'Password has changed',
            email: studentByToken.email,
            redirectTo: '/students/login/'
        }
    }
}