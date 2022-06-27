import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/educators/', 'Classes/EducatorClassesController.showByEducator');
    Route.put('/educators/:id', 'Classes/EducatorClassesController.update');
    Route.patch('/educators/:id', 'Classes/EducatorClassesController.update');
    Route.delete('/educators/:id', 'Classes/EducatorClassesController.destroy');
}).prefix('/classes').middleware(['educatorsAuth'])

Route.group(() => {
    Route.post('/students/', 'Classes/StudentClassesController.store');
    Route.get('/students/:student_id', 'Classes/StudentClassesController.show');
    Route.put('/students/:id', 'Classes/StudentClassesController.update');
    Route.patch('/students/:id', 'Classes/StudentClassesController.update');
    Route.delete('/students/:id', 'Classes/StudentClassesController.destroy');
}).prefix('/classes').middleware(['studentsAuth'])