import React, { useEffect, useState } from 'react'
import {MdCheck,MdDeleteForever} from "react-icons/md"

const todoskey = "reactTodo"

const Todo = () => {

  const [inputValue, setInputValue] = useState({});
  const [task, setTask] = useState(()=>{
    return JSON.parse(localStorage.getItem(todoskey)) || [];
  });
  const [timeDate, setTimeDate] = useState('');
  

  const handleInputChange = (value) => {
      setInputValue({id: value, content: value, checked: false})
 
  }

  const handleFormSubmit = (event)=> {
    event.preventDefault();

    const { id, content, checked} = inputValue;
    if(!content) return;

    const ifTodoContentMatched = task.find((curTask) => curTask.content === content);
    if(ifTodoContentMatched) return;

    setTask((prevTask) => [...prevTask, {id, content, checked}])

    setInputValue({id: '', content: '', checked: false});
  }

  //todo add data to localstorage

  localStorage.setItem(todoskey, JSON.stringify(task));

  // todo Date and Time
    useEffect(() => {
      setInterval(() => {
        const now = new Date();
        const formatedDate = now.toLocaleDateString();
        const formatedTime = now.toLocaleTimeString()
        setTimeDate(`${formatedDate} - ${formatedTime}`)
      }, 1000);
    }, [])
    
      const handleDelete = (data) => {
          const updatedTask = task.filter((curTask)=> curTask.content !== data)
          setTask(updatedTask);
      }
      const handleClearButton = () => {
        setTask([])
      }
      
      const handleCheckedTodo = (data) => {
          const updatedTask = task.map((curTask) => {
            if(curTask.content === data){            
              return {...curTask, checked: !curTask.checked}
            } else{
              return curTask
            }
          })
          setTask(updatedTask)
      }
  return (
    <>

  <section className='todo-container  bg-amber-50 m-5'>
    <header>
      <h1 className='font-bold text-2xl'>Todo List</h1>
      <h2 className='font-bold text-xl m-2 text-blue-500'>{timeDate}</h2>
    </header>
    <section className='form'>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="text" onChange={(e)=>handleInputChange(e.target.value)} className='todo-input border-2 rounded-2xl px-1 py-1' autoComplete='off' value={inputValue.content}/>
        </div>
        <div>
          <button type='submit' className='todo-btn bg-blue-400 hover:bg-yellow-400 text-white rounded-md p-2 m-2'>Add Task</button>
        </div>
      </form>
    </section>
      <section>
        <ul> 
          {
            task.map((curTask) => {
              return(
                <li key={curTask.id} className='text-2xl font-bold p-2 flex items-center justify-between w-[200px] h-[60px] bg-amber-500 rounded-md mb-2'>
                  <span className={`${curTask.checked} ? line-through : bg-red-500` }>{curTask.content}</span>
                  <button>
                    <MdCheck onClick={() =>handleCheckedTodo() } className=' bg-green-400 text-3xl  hover:bg-green-600 text-white rounded-md '/>
                  </button>
                  <button>
                    <MdDeleteForever onClick={() => handleDelete(curTask.content)} className=' bg-red-400 text-3xl hover:bg-red-600 text-white rounded-md'/>
                  </button>
                </li>
              )
            })
          }
        </ul>
      </section>
          <section>
            <button onClick={handleClearButton} className=' bg-red-400 text-2xl  hover:bg-red-600 text-white rounded-md p-2'>Clear all</button>
          </section>
  </section>

    </>
  )
}

export default Todo