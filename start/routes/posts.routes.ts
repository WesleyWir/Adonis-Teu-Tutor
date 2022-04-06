import Route from '@ioc:Adonis/Core/Route'

Route.resource('posts/students', 'Students/StudentPostsController').except(['create', 'index', 'update', 'store'])
.middleware({
  destroy: ['studentsAuth']
})


Route.group(() => {
  Route.post('/:studentId', 'Students/StudentPostsController.store').middleware('studentsAuth')
  Route.patch('/:id/:studentId', 'Students/StudentPostsController.update').middleware('studentsAuth')
  Route.put('/:id/:studentId', 'Students/StudentPostsController.update').middleware('studentsAuth')
  Route.get('/', 'Students/StudentPostsController.index')
}).prefix('/posts/students')

// Educator Post Interest

Route.group(() => {
  Route.get('/:id', 'Educators/EducatorPostInterestsController.show')
}).prefix('/post-interest/educators').middleware(['studentsAuth'])

Route.group(() => {
  Route.post('/:id', 'Educators/EducatorPostInterestsController.store')
  Route.delete('/:id', 'Educators/EducatorPostInterestsController.destroy')
}).prefix('/post-interest/educators').middleware(['educatorsAuth'])