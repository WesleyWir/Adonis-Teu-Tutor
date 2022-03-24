import { GuardsList } from '@ioc:Adonis/Addons/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthorizationException from 'App/Exceptions/AuthorizationException';

export default class EducatorsAuth {
  protected redirectTo = '/educators/login'
  static readonly GUARDS_TO_AUTH: (keyof GuardsList)[] = ['api_educators'];

  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        return true
      }
    }

    throw new AuthorizationException(
      'Unauthorized access',
      this.redirectTo,
    )
  }

  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    const guards = customGuards.length ? customGuards : EducatorsAuth.GUARDS_TO_AUTH;
    await this.authenticate(auth, guards);
    await next();
  }
}
