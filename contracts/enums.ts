export enum ClassTypes{
    IN_PERSON = 'in_person',
    ONLINE = 'online',
    BOTH = 'both',
}

export enum InPersonTypes{
    STUDENT_LOCAL = 'student_local',
    EDUCATOR_LOCAL = 'educator_local',
    BOTH = 'both',
}

export enum EducatorPaymentCodes{
    PIX = 'pix'
}

export enum PixKeyType{
    CPF = 'cpf',
    CNPJ = 'cnpj',
    EMAIL = 'email',
    PHONE = 'phone',
    RANDOM = 'random',
}

export enum ContactMeansCode{
    FACEBOOK = 'facebook',
    EMAIL = 'email',
    WHATSAPP = 'whatsapp',
    LINKEDIN = 'linkedin'
}

export enum ClassCalendarStatus{
    TO_DO = 'to_do',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum PossibleEducatorRate{
    ONE_STAR = 1,
    TWO_STAR = 2,
    THREE_STAR = 3,
    FOUR_STAR = 4,
    FIVE_STAR = 5
}