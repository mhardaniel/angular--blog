import {Route} from '@angular/router'
import {AuthGuard} from './shared/services/auth.guard'

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/globalFeed/globalFeed.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/yourFeed/yourFeed.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tagFeed/tagFeed.routes').then((m) => m.routes),
  },
  {
    path: 'article/new',
    loadChildren: () =>
      import('src/app/createArticle/createArticle.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('src/app/article/article.routes').then((m) => m.routes),
  },
  {
    path: 'article/:slug/edit',
    loadChildren: () =>
      import('src/app/editArticle/editArticle.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('src/app/settings/settings.routes').then((m) => m.routes),
  },
  {
    path: 'profile/:slug',
    loadChildren: () =>
      import('src/app/userProfile/userProfile.routes').then((m) => m.routes),
  },
  {
    path: 'profile/:slug/favorites',
    loadChildren: () =>
      import('src/app/userProfile/userProfile.routes').then((m) => m.routes),
  },
]
