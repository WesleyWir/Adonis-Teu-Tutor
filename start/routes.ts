/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Route.group(() => {
//   Route.get('/', 'StudentsController.index').as('students.index')
//   Route.get('/:id', 'StudentsController.show').as('students.show')
//   Route.post('/', 'StudentsController.store').as('students.store')
//   Route.patch('/disable/:id', 'StudentsController.disable').as('students.disable')
//   Route.patch('/reactivate/:id', 'StudentsController.reactivate').as('students.reactivate')
//   Route.patch('/:id', 'StudentsController.update').as('students.update')
//   Route.delete('/:id', 'StudentsController.delete').as('students.delete')
// }).prefix('api/v1/students').middleware(['auth'])

Route.resource('students', 'StudentsController')

// START: CRUD
// studentRouter.post('/', csrfProtection, validateCreate, studentController.store);
// studentRouter.get('/', studentController.index);
// studentRouter.get('/:id', studentController.show);
// studentRouter.patch('/disable/:id', validateHasPassword, ensureStudentAuth, studentController.disable);
// studentRouter.patch('/reactivate/:id', studentController.reactivate);
// studentRouter.patch('/:id', validateUpdate, ensureStudentAuth, studentController.update);
// studentRouter.delete('/delete/:id', validateHasPassword, ensureStudentAuth, studentController.delete);
// END: CRUD