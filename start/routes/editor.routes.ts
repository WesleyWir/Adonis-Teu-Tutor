import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.post('/', 'Editor/UploadEditorController.store');
}).prefix('/editor')