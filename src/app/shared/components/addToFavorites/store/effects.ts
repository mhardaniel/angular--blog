import {inject} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {AddToFavoritesService} from '../services/addToFavorites.service'
import {addToFavoritesActions} from './actions'

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService),
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({article})
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure())
          }),
        )
      }),
    )
  },
  {functional: true},
)

export const redirectIfNotLoggedInEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavoritesFailure),
      tap(() => {
        router.navigateByUrl('/login')
      }),
    )
  },
  {functional: true, dispatch: false},
)
