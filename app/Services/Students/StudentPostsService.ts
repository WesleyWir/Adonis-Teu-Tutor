import StudentPost from 'App/Models/StudentPost';
import Student from 'App/Models/Student';
import Subject from 'App/Models/Subject';
import NotFoundException from 'App/Exceptions/NotFoundException';

export default class StudentPostsService {
    public async createPost({ postPayload, studentId }: { postPayload: {title, content, subject}; studentId: string; }) {
        const student = await Student.find(studentId);

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        if(!(postPayload.subject)){
            return await this.createPostWithoutSubject(postPayload, student);
        }

        const subject = await Subject.find(postPayload.subject);

        if (!subject) {
            throw new NotFoundException('Subject not found');
        }

        return await this.createPostWithSubject(postPayload, student, subject);
    }

    private async createPostWithoutSubject(postPayload: {title, content, subject}, student: Student){
        return await student.related('posts').create(postPayload);
    }
    
    private async createPostWithSubject(postPayload: {title, content, subject}, student: Student, subject: Subject){
        let studentPost = new StudentPost();
        studentPost.title = postPayload.title;
        studentPost.content = postPayload.content;
        await studentPost.related('student').associate(student);
        await studentPost.related('subject').associate(subject);
        return await studentPost.save();
    }
}