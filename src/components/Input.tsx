import React, {useRef} from "react";
import "./styles.css"


interface Props {
    todo : string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e:React.FormEvent) => void;
}
const Input : React.FC<Props> = ({todo, setTodo, handleAdd}) => {
   
    const inputRef = useRef<HTMLInputElement>(null)

    return (
       <form onSubmit={(e)=>{ 
           handleAdd(e);
           inputRef.current?.blur();
       }} className="input">
           <input ref={inputRef} value={todo} onChange={(e)=> setTodo(e.target.value)} type="text" className="input__box" placeholder="Enter a task" />
           <button type="submit" className="input_submit">Go</button>
           </form>
    )
}

export default Input