import I18n from '@ioc:Adonis/Addons/I18n'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * The middleware detects the user language using the "Accept-language" HTTP header
 * or the "lang" query string parameter.
 *
 * Feel free to change the middleware implementation to what suits your needs. Just
 * make sure
 *
 * - You always ensure the user selected language is supported by your app.
 * - Only call "switchLocale" when the detected language is valid string value and
 *   not "null" or "undefined"
 */
export default class DetectUserLocale {
  protected getUserLanguage(ctx: HttpContextContract) {
    const availableLocales = I18n.supportedLocales()
    return ctx.request.language(availableLocales) || ctx.request.input('lang')
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const language = this.getUserLanguage(ctx)

    if (language) {
      ctx.i18n.switchLocale(language)
    }

    if ('view' in ctx) {
      ctx.view.share({ i18n: ctx.i18n })
    }

    await next()
  }
}
