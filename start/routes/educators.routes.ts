import Route from '@ioc:Adonis/Core/Route'

Route.resource('educators', 'EducatorsController').except(['create'])
// .middleware({
//   update: ['educatorsAuth'],
//   destroy: ['educatorsAuth']
// })

Route.group(() => {
  Route.post('/forgot', 'EducatorsPasswordController.forgotPassword');
  Route.post('/reset', 'EducatorsPasswordController.resetPassword');
}).prefix('/educators');

Route.group(() => {
  Route.post('/educators', 'EducatorsSessionsController.store');
  Route.delete('/educators', 'EducatorsSessionsController.destroy');
}).prefix('/sessions')