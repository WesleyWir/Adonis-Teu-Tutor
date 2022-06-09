import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.post('/students/', 'RatingsController.store');
    Route.put('/students/', 'RatingsController.store');
    Route.patch('/students/', 'RatingsController.store');
    Route.delete('/students/', 'AvatarsController.destroy');
}).prefix('/ratings').middleware(['studentsAuth'])

Route.group(() => {
    Route.patch('/educators/:educator_id', 'RatingsController.show');
}).prefix('/ratings')
