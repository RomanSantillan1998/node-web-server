import { Request, Response } from 'express';

let todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Read a book', completedAt: null },
  { id: 3, text: 'Tidy my room', completedAt: new Date() },
]

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = ( _req: Request, res: Response ) => {
    return res.status(200).json( todos );
  };

  public getTodoById = ( req: Request, res: Response ) => {

    const todoId = Number(req.params.todoId);

    if ( isNaN( todoId )) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find( todo => todo.id === todoId );

    ( todo )
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `Todo with id ${todoId} not found`})

  }

  public createTodo = ( req: Request, res: Response ) => {

    const { text } = req.body;

    if ( !text ) {
      return res.status(400).json({ error: 'Text property is required'});
    } 

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date(),
    }

    todos.push( newTodo );

    res.json( newTodo );

  }

  public updateTodo = ( req: Request, res: Response ) => {

    const todoId = Number(req.params.todoId);

    if ( isNaN( todoId )) {
      return res.status(400).json({ error: 'ID argument is not a number' })
    }

    const todo = todos.find( todo => todo.id === todoId );

    if ( !todo ) {
      return res.status(404).json({ error: `Todo with id ${todoId} not found`})
    }

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;

    ( completedAt === 'null' )
      ? todo.completedAt = null
      : todo.completedAt = new Date( completedAt || todo.completedAt );

    //! pasando por referencia. NO DEBERIAMOS DE MUTAR LA INFORMACION
    // todo.text = text;

    // todos.forEach( ( todo, index ) => {
    //   if ( todo.id === todoId ) {
    //     todos[index] = todo;
    //   }
    // })

    res.status(200).json( todo )

  }

  public deleteTodo = ( req: Request, res: Response ) => {

    const todoId  = Number(req.params.todoId);

    const deletedTodo = todos.find( todo => todo.id === todoId );

    todos = todos.filter( todo => todo.id !== todoId );

    (deletedTodo)
      ? res.status(200).json( deletedTodo )
      : res.status(404).json({ msg: `Todo with id ${todoId} not exists`})
    
  }

}
