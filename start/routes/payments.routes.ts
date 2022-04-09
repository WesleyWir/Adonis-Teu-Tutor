import Route from '@ioc:Adonis/Core/Route'


// PIX
Route.group(() => {
    Route.get('/:educator_id', 'Educators/EducatorsPixController.show')
}).prefix('/pix/educators')

Route.group(() => {
    Route.post('/', 'Educators/EducatorsPixController.store')
    Route.patch('/', 'Educators/EducatorsPixController.store')
    Route.put('/', 'Educators/EducatorsPixController.store')
    Route.delete('/', 'Educators/EducatorsPixController.destroy')
  }).prefix('/pix/educators').middleware(['educatorsAuth'])