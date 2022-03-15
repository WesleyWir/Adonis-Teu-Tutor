import Route from '@ioc:Adonis/Core/Route'

Route.resource('posts/students', 'StudentPostsController').except(['create', 'index', 'update', 'store'])
// .middleware({
//   store: ['studentsAuth'],
//   update: ['studentsAuth'],
//   destroy: ['studentsAuth']
// })


Route.group(() => {
  Route.post('/:studentId', 'StudentPostsController.store')
  Route.patch('/:id/:studentId', 'StudentPostsController.update')
  Route.put('/:id/:studentId', 'StudentPostsController.update')
  Route.get('/', 'StudentPostsController.index')
}).prefix('/posts/students')