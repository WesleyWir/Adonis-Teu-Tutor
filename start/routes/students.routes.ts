import Route from '@ioc:Adonis/Core/Route'

Route.resource('students', 'StudentsController').except(['create'])
.middleware({
  update: ['studentsAuth'],
  destroy: ['studentsAuth']
})

Route.group(() => {
  Route.post('/forgot', 'StudentsPasswordController.forgotPassword');
  Route.post('/reset', 'StudentsPasswordController.resetPassword');
}).prefix('/students');

Route.group(() => {
  Route.post('/students', 'StudentsSessionsController.store');
  Route.delete('/students', 'StudentsSessionsController.destroy');
}).prefix('/sessions')