import Route from '@ioc:Adonis/Core/Route'

// CRUD
Route.resource('educators', 'Educators/EducatorsController').except(['create'])
.middleware({
  update: ['educatorsAuth'],
  destroy: ['educatorsAuth']
})

// forgot/reset password
Route.group(() => {
  Route.post('/forgot', 'Educators/EducatorsPasswordController.forgotPassword');
  Route.post('/reset', 'Educators/EducatorsPasswordController.resetPassword');
}).prefix('/educators');

// Sessions
Route.group(() => {
  Route.post('/educators', 'Educators/EducatorsSessionsController.store');
  Route.delete('/educators', 'Educators/EducatorsSessionsController.destroy');
}).prefix('/sessions')

// Addresses
Route.group(() => {
  Route.get('/educators/', 'Educators/EducatorAddressesController.index');
}).prefix('/addresses')
Route.group(() => {
  Route.get('/educators/:id', 'Educators/EducatorAddressesController.show');
  Route.get('/educators/edit/:id', 'Educators/EducatorAddressesController.edit');
  Route.post('/educators/', 'Educators/EducatorAddressesController.store');
  Route.put('/educators/:id', 'Educators/EducatorAddressesController.update');
  Route.patch('/educators/:id', 'Educators/EducatorAddressesController.update');
  Route.delete('/educators/:id', 'Educators/EducatorAddressesController.destroy');
}).prefix('/addresses').middleware(['educatorsAuth'])

// Class types
Route.group(() => {
  Route.get('/educators/:id', 'Educators/EducatorClassTypesController.show');
}).prefix('/class-types')
Route.group(() => {
  Route.post('/educators/', 'Educators/EducatorClassTypesController.store');
}).prefix('/class-types').middleware(['educatorsAuth']);

// In person types
Route.group(() => {
  Route.get('/educators/:id', 'Educators/EducatorInPersonController.show');
}).prefix('/in-person/');
Route.group(() => {
  Route.post('/educators/', 'Educators/EducatorInPersonController.store');
}).prefix('/in-person/').middleware(['educatorsAuth']);

// Online Tools
Route.resource('online-tools', 'Educators/EducatorOptionToolsController').except(['create'])
// .middleware({
//   update: ['adminAuth'],
//   destroy: ['adminAuth']
// })
