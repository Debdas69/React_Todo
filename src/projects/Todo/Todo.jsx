import React, { useEffect, useState } from 'react'
import {MdCheck,MdDeleteForever} from "react-icons/md"

const Todo = () => {

  const [inputValue, setInputValue] = useState('');
  const [task, setTask] = useState([]);
  const [timeDate, setTimeDate] = useState('');
  

  const handleInputChange = (value) => {
      setInputValue(value)
 
  }

  const handleFormSubmit = (event)=> {
    event.preventDefault();

    if(!inputValue) return;

    if(task.includes(inputValue)) {
      setInputValue("")
      return
    };

    setTask((prevTask) => [...prevTask, inputValue])

    setInputValue("");
  }

  // todo Date and Time
    useEffect(() => {
      setInterval(() => {
        const now = new Date();
        const formatedDate = now.toLocaleDateString();
        const formatedTime = now.toLocaleTimeString()
        setTimeDate(`${formatedDate} - ${formatedTime}`)
      }, 1000);
    }, [])
    
      const handleDelete = (value) => {
          const updatedTask = task.filter((ele)=> ele!==value)
          setTask(updatedTask);
      }
      const handleClearButton = () => {
        setTask([])
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
          <input type="text" onChange={(e)=>handleInputChange(e.target.value)} className='todo-input border-2 rounded-2xl px-1 py-1' autoComplete='off' value={inputValue}/>
        </div>
        <div>
          <button type='submit' className='todo-btn bg-blue-400 hover:bg-yellow-400 text-white rounded-md p-2 m-2'>Add Task</button>
        </div>
      </form>
    </section>
      <section>
        <ul> 
          {
            task.map((curTask,index) => {
              return(
                <li key={index} className='text-2xl font-bold p-2 flex items-center justify-between w-[200px] h-[60px] bg-amber-500 rounded-md mb-2'>
                  <span className=''>{curTask}</span>
                  <button>
                    <MdCheck className=' bg-green-400 text-3xl  hover:bg-green-600 text-white rounded-md '/>
                  </button>
                  <button>
                    <MdDeleteForever onClick={() => handleDelete(curTask)} className=' bg-red-400 text-3xl hover:bg-red-600 text-white rounded-md'/>
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