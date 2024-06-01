import { AuthService } from "./../services/auth/auth.service";
import { UserActionTypes } from "./../actions/user";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, switchMap, take, withLatestFrom } from "rxjs/operators";
import { Action, Store as NGRXStore } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromRoot from "../reducers";
import { User } from "../models/user.interface";
import * as userActions from "../actions/user";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: NGRXStore<fromRoot.State>,
        private authService: AuthService
    ) {}

    authenticate$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.Login),
            withLatestFrom(this.store),
            switchMap(([action, _]) => {
                return this.authService.auth((action as any).payload).pipe(
                    take(1),
                    switchMap((response: User) => {
                        return of<Action>(
                            new userActions.LoginSuccess(response)
                        );
                    }),
                    catchError((error) => of(new userActions.LoginFail(error)))
                );
            })
        )
    );

    logout$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.Logout),
            withLatestFrom(this.store),
            switchMap(() => {
                this.authService.logout();
                return of<Action>(new userActions.LogoutSuccess());
            }),
            catchError((error) => of(new userActions.LogoutFail(error)))
        )
    );
}
