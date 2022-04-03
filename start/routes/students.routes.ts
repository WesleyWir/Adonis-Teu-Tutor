import Route from '@ioc:Adonis/Core/Route'

Route.resource('students', 'Students/StudentsController').except(['create'])
.middleware({
  update: ['studentsAuth'],
  destroy: ['studentsAuth']
})

Route.group(() => {
  Route.post('/forgot', 'Students/StudentsPasswordController.forgotPassword');
  Route.post('/reset', 'Students/StudentsPasswordController.resetPassword');
}).prefix('/students');

Route.group(() => {
  Route.post('/students', 'Students/StudentsSessionsController.store');
  Route.delete('/students', 'Students/StudentsSessionsController.destroy');
}).prefix('/sessions')