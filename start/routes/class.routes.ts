import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/educator/:educator_id', 'Classes/EducatorClassesController.showByEducator');
    Route.get('/:id', 'Classes/EducatorClassesController.show');
    Route.put('/:id', 'Classes/EducatorClassesController.update');
    Route.patch('/:id', 'Classes/EducatorClassesController.update');
    Route.delete('/:id', 'Classes/EducatorClassesController.destroy');
}).prefix('/classes').middleware(['educatorsAuth'])

Route.group(() => {
    Route.post('/', 'Clasess/StudentClassesController.store');
    Route.get('/:id', 'Clasess/StudentClassesController.show');
    Route.put('/:id', 'Clasess/StudentClassesController.update');
    Route.patch('/:id', 'Clasess/StudentClassesController.update');
    Route.delete('/:id', 'Clasess/StudentClassesController.destroy');
}).prefix('/classes').middleware(['studentsAuth'])