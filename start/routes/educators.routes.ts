import Route from '@ioc:Adonis/Core/Route'

// CRUD

Route.resource('educators', 'EducatorsController').except(['create'])
.middleware({
  update: ['educatorsAuth'],
  destroy: ['educatorsAuth']
})

// forgot/reset password

Route.group(() => {
  Route.post('/forgot', 'EducatorsPasswordController.forgotPassword');
  Route.post('/reset', 'EducatorsPasswordController.resetPassword');
}).prefix('/educators');

// Sessions

Route.group(() => {
  Route.post('/educators', 'EducatorsSessionsController.store');
  Route.delete('/educators', 'EducatorsSessionsController.destroy');
}).prefix('/sessions')

// Addresses

Route.group(() => {
  Route.get('/educators/', 'EducatorAddressesController.index');
}).prefix('/addresses')
Route.group(() => {
  Route.get('/educators/:id', 'EducatorAddressesController.show');
  Route.get('/educators/edit/:id', 'EducatorAddressesController.edit');
  Route.post('/educators/', 'EducatorAddressesController.store');
  Route.put('/educators/:id', 'EducatorAddressesController.update');
  Route.patch('/educators/:id', 'EducatorAddressesController.update');
  Route.delete('/educators/:id', 'EducatorAddressesController.destroy');
}).prefix('/addresses').middleware(['educatorsAuth'])

// Class types

Route.group(() => {
  Route.get('/educators/:id', 'EducatorClassTypesController.show'); // Maybe without auth
}).prefix('/class-types')
Route.group(() => {
  Route.post('/educators/', 'EducatorClassTypesController.store'); // Maybe without auth
}).prefix('/class-types').middleware(['educatorsAuth'])