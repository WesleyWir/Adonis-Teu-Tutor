import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/educators/', 'Classes/EducatorClassesController.showByEducator');
    Route.put('/educators/class-calendars/complete/:id', 'Classes/EducatorClassesController.completeClass');
    Route.patch('/educators/class-calendars/complete/:id', 'Classes/EducatorClassesController.completeClass');
    Route.put('/educators/class-calendars/to-do/:id', 'Classes/EducatorClassesController.toDoClass');
    Route.patch('/educators/class-calendars/to-do/:id', 'Classes/EducatorClassesController.toDoClass');
    Route.delete('/educators/class-calendars/cancel/:id', 'Classes/EducatorClassesController.cancelClass');
}).prefix('/classes').middleware(['educatorsAuth'])

Route.group(() => {
    Route.get('/students/', 'Classes/StudentClassesController.showByStudent');
    Route.post('/students/', 'Classes/StudentClassesController.store');
    Route.put('/students/:id', 'Classes/StudentClassesController.update');
    Route.patch('/students/:id', 'Classes/StudentClassesController.update');
    Route.put('/students/class-calendars/complete/:id', 'Classes/StudentClassesController.completeClass');
    Route.patch('/students/class-calendars/complete/:id', 'Classes/StudentClassesController.completeClass');
    Route.put('/students/class-calendars/to-do/:id', 'Classes/StudentClassesController.toDoClass');
    Route.patch('/students/class-calendars/to-do/:id', 'Classes/StudentClassesController.toDoClass');
    Route.delete('/students/class-calendars/cancel/:id', 'Classes/StudentClassesController.cancelClass');
}).prefix('/classes').middleware(['studentsAuth'])