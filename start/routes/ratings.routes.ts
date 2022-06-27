import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/students/has-class/:educator_id', 'Ratings/RatingsController.hasClass')
    Route.post('/students/:educator_id', 'Ratings/RatingsController.store');
    Route.put('/students/', 'Ratings/RatingsController.store');
    Route.patch('/students/', 'Ratings/RatingsController.store');
    Route.delete('/students/', 'Ratings/AvatarsController.destroy');
}).prefix('/ratings').middleware(['studentsAuth'])

Route.group(() => {
    Route.get('/educators/:educator_id', 'Ratings/RatingsController.show');
}).prefix('/ratings')
