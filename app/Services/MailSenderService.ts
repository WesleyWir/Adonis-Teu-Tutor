import Mail from "@ioc:Adonis/Addons/Mail";

export default class MailSenderService{
    private data: object;
    private _fromEmail: string;
    private _toEmail: string;
    private _subject: string;
    private _templatePath: string;

    constructor(fromEmail: string, toEmail: string, subject: string, templatePath: string){
        this._fromEmail = fromEmail;
        this._toEmail = toEmail;
        this._subject = subject;
        this._templatePath = templatePath;
    }

    public setData(data: object){
        this.data = data;
    }

    public async execute(){
        return await Mail.send((message) => {
            message.from(this._fromEmail).to(this._toEmail).subject(this._subject).htmlView(this._templatePath, this.data);
        });
    }
}