import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.post('/students/', 'AvatarsController.store');
    Route.put('/students/', 'AvatarsController.store');
    Route.patch('/students/', 'AvatarsController.store');
    Route.delete('/students/', 'AvatarsController.destroy');
}).prefix('/avatar').middleware(['studentsAuth'])

Route.group(() => {
    Route.post('/educators/', 'AvatarsController.store');
    Route.put('/educators/', 'AvatarsController.store');
    Route.patch('/educators/', 'AvatarsController.store');
    Route.delete('/educators/', 'AvatarsController.destroy');
}).prefix('/avatar').middleware(['educatorsAuth'])