import { HttpContext } from "@adonisjs/core/build/standalone";
import { I18nContract } from "@ioc:Adonis/Addons/I18n";

export default class I18nSingleton {
    private static instance: I18nSingleton;
    private i18n: I18nContract;

    private constructor() {
        const { i18n } = HttpContext.getOrFail();
        this.i18n = i18n;
    }

    public static getInstance(): I18nSingleton {
        if (!I18nSingleton.instance) {
            I18nSingleton.instance = new I18nSingleton();
        }

        return I18nSingleton.instance;
    }

    public executeFormatMessage(messageId: string): string 
    {
        return this.i18n.formatMessage(messageId)
    }
}
