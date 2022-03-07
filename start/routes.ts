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

// Students

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

// Subjects

Route.resource('subjects', 'SubjectsController').except(['create'])
// .middleware({
//   store: ['adminAuth'],
//   update: ['adminAuth'],
//   destroy: ['adminAuth']
// })
