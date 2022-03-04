import React, { useState, useEffect, useRef } from 'react'
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import {MdDone} from "react-icons/md"
import {Todo} from "./model"
import "./styles.css"



interface Props {
    todos : Todo[];
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo: React.FC<Props> = ({todos, setTodos, todo}) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id:number) => {
        setTodos(todos.map((todo)=> todo.id === id? {...todo, isDone:!todo.isDone}: todo))
    }
    const handleDelete = (id:number) => {
 
        setTodos(todos.filter((todo)=> todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id:number) => {

        e.preventDefault();
        setTodos(todos.map((todo)=> (
            todo.id === id? {...todo, todo:editTodo} : todo
        )
        )
        
        )
        setEdit(false)

    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        inputRef.current?.focus()
    }, [edit])
  return (
    <form onSubmit={(e)=> handleEdit(e, todo.id)} className='todo__single'>

        {
            edit? (
                <input  className='todos__single--text' value={editTodo} onChange={(e)=> setEditTodo(e.target.value)} ref={inputRef} />
            ): todo.isDone ? (
                <s className='todos__single--text'>{todo.todo}</s>
            ) : (
                <span className='todos__single--text'>{todo.todo}</span>

            )
        }
 


    <div>
    <span className='icon' onClick={()=> {
        if(!edit && !todo.isDone) {
            setEdit(!edit)
        }
    }}> <AiFillEdit /> </span>
    <span onClick={()=> handleDelete(todo.id)} className='icon'> <AiFillDelete/></span>
    <span onClick={()=> handleDone(todo.id)} className='icon'><MdDone/></span>
    </div>
    </form>
  )
}

export default SingleTodo