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
  Route.get('/educators/me', 'Educators/EducatorsSessionsController.show').middleware('educatorsAuth');
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

// Educator Online Tools
Route.group(() => {
  Route.get('/:educator_id', 'Educators/EducatorOnlineController.show')
}).prefix('/educator-online-tools');

Route.group(() => {
  Route.post('/', 'Educators/EducatorOnlineController.store')
  Route.patch('/:id', 'Educators/EducatorOnlineController.update')
  Route.put('/:id', 'Educators/EducatorOnlineController.update')
  Route.delete('/:id', 'Educators/EducatorOnlineController.destroy')
}).prefix('/educator-online-tools').middleware(['educatorsAuth']);

// Educator Contact Means
Route.group(() => {
  Route.get('/:educator_id', 'Educators/EducatorsContactMeansController.show')
}).prefix('/contact-means/educators')

Route.group(() => {
  Route.post('/', 'Educators/EducatorsContactMeansController.store')
  Route.patch('/:id', 'Educators/EducatorsContactMeansController.update')
  Route.put('/:id', 'Educators/EducatorsContactMeansController.update')
  Route.delete('/:id', 'Educators/EducatorsContactMeansController.destroy')
}).prefix('/contact-means/educators').middleware(['educatorsAuth']);

// Educator Post Interest
Route.group(() => {
  Route.post('/:id', 'Educators/EducatorPostInterestsController.store')
  Route.delete('/:id', 'Educators/EducatorPostInterestsController.destroy')
}).prefix('/post-interest/educators').middleware(['educatorsAuth'])