import { Router } from "express";
import { TodosController } from './controller';

export class TodoRoutes {

  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    router.get('/', todoController.getTodos );
    router.get('/:todoId', todoController.getTodoById )
    router.post('/', todoController.createTodo );
    router.put('/:todoId', todoController.updateTodo )
    router.delete('/:todoId', todoController.deleteTodo );

    return router;
  }

}