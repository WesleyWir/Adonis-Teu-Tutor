import Route from '@ioc:Adonis/Core/Route'

Route.resource('posts/students', 'Students/StudentPostsController').except(['create', 'index', 'update', 'store'])
.middleware({
  destroy: ['studentsAuth']
})


Route.group(() => {
  Route.post('/', 'Students/StudentPostsController.store').middleware('studentsAuth')
  Route.patch('/:id', 'Students/StudentPostsController.update').middleware('studentsAuth')
  Route.put('/:id', 'Students/StudentPostsController.update').middleware('studentsAuth')
  Route.get('/', 'Students/StudentPostsController.index')
  Route.get('/student/:student_id', 'Students/StudentPostsController.indexStudent')
}).prefix('/posts/students')

// Educator Post Interest

Route.group(() => {
  Route.get('/:id', 'Educators/EducatorPostInterestsController.show')
}).prefix('/post-interest/educators').middleware(['studentsAuth'])

Route.group(() => {
  Route.get('/:id/:educator_id', 'Educators/EducatorPostInterestsController.educatorHasInterest')
  Route.post('/:id', 'Educators/EducatorPostInterestsController.store')
  Route.delete('/:id', 'Educators/EducatorPostInterestsController.destroy')
}).prefix('/post-interest/educators').middleware(['educatorsAuth'])