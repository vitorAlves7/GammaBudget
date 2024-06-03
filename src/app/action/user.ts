import { Action } from '@ngrx/store';

export enum UserActionTypes {
    Login = '[User] Login',
    Logout = '[User] Logout',
    LoginFail = '[User] LoginFail',
    LogoutFail = '[User] LogoutFail',
    LoginSuccess = '[User] LoginSuccess',
    LogoutSuccess = '[User] LogoutSuccess',
}

export class Login implements Action {
    readonly type = UserActionTypes.Login;

    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = UserActionTypes.Logout
}

export class LoginFail implements Action {
    readonly type = UserActionTypes.LoginFail

    constructor(public payload: any) { }
}

export class LogoutFail implements Action {
    readonly type = UserActionTypes.LogoutFail

    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = UserActionTypes.LoginSuccess

    constructor(public payload: any) {}
}

export class LogoutSuccess implements Action {
    readonly type = UserActionTypes.LogoutSuccess
}

export type UserActions = Login | Logout |
    LoginFail | LoginSuccess | LogoutSuccess |
    LogoutFail;