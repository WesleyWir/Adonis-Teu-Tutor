import Route from '@ioc:Adonis/Core/Route'

Route.resource('subjects', 'SubjectsController').except(['create'])
// .middleware({
//   store: ['adminAuth'],
//   update: ['adminAuth'],
//   destroy: ['adminAuth']
// })