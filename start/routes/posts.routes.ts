import Route from '@ioc:Adonis/Core/Route'

Route.resource('posts/students', 'StudentPostsController').except(['create', 'index', 'update', 'store'])
.middleware({
  destroy: ['studentsAuth']
})


Route.group(() => {
  Route.post('/:studentId', 'StudentPostsController.store').middleware('studentsAuth')
  Route.patch('/:id/:studentId', 'StudentPostsController.update').middleware('studentsAuth')
  Route.put('/:id/:studentId', 'StudentPostsController.update').middleware('studentsAuth')
  Route.get('/', 'StudentPostsController.index')
}).prefix('/posts/students')