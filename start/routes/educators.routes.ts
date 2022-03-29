import Route from '@ioc:Adonis/Core/Route'

Route.resource('educators', 'EducatorsController').except(['create'])
.middleware({
  update: ['educatorsAuth'],
  destroy: ['educatorsAuth']
})

Route.group(() => {
  Route.post('/forgot', 'EducatorsPasswordController.forgotPassword');
  Route.post('/reset', 'EducatorsPasswordController.resetPassword');
}).prefix('/educators');

Route.group(() => {
  Route.post('/educators', 'EducatorsSessionsController.store');
  Route.delete('/educators', 'EducatorsSessionsController.destroy');
}).prefix('/sessions')

// Route.resource('addresses/educators', 'EducatorAddressesController').except(['create']).middleware({
//   '*': ['educatorsAuth'],
// })

Route.group(() => {
  Route.get('/educators/', 'EducatorAddressesController.index'); // Maybe without auth
}).prefix('/addresses')
Route.group(() => {
  Route.get('/educators/:id', 'EducatorAddressesController.show');
  Route.get('/educators/edit/:id', 'EducatorAddressesController.edit');
  Route.post('/educators/', 'EducatorAddressesController.store');
  Route.put('/educators/:id', 'EducatorAddressesController.update');
  Route.patch('/educators/:id', 'EducatorAddressesController.update');
  Route.delete('/educators/:id', 'EducatorAddressesController.destroy');
}).prefix('/addresses').middleware(['educatorsAuth'])