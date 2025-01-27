export default function Home() {
    const [newItem, setNewItem] = useState<string>("");  
    const [todos, setTodos] = useState<string>([]);
    const [editTodo, setEditTodo] = useState<string>([]);
    const [filterTodo, setFilterTodo] = useState<string>([]);
  
    
  
    useEffect(() => {
      setNewItem(editTodo.title);
    }, [editTodo]);
  
    useEffect(() => {
      setFilterTodo(currentFilter =>
        {
          return todos.filter(todo => todo.title.toLowerCase().includes(newItem.toLowerCase()))
        })
    }, [newItem]);
  
    
    function getAllTodo()
    {
      return todos;
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => 
    {
        event.preventDefault();
        setTodos((currentTodos) => {  
        return [...currentTodos, {id: crypto.randomUUID(), title: newItem, completed: false}, ]});
        setNewItem("")
    };
  
    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => 
    {
        event.preventDefault();
        setTodos((currentTodos) => 
          {
            return currentTodos.map(todo => {
              if(todo.id === editTodo.id){
                return {...todo, title: newItem }
              } 
  
              return todo
            })
          })
          setEditTodo({})
      };
  
  
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setNewItem(event.target.value);
          console.log("To Do " +  newItem)
    };
    console.log("filterTodo")
    console.log(filterTodo)
  
    console.log("todos")
    console.log(todos)
  
    function handleCheckBox(id:string, completed:boolean){
          setTodos((currentTodos) => 
          {
            return currentTodos.map(todo => {
              if(todo.id === id){
                return {...todo, completed}
              } 
              return todo
            })
          })
        };
    function deleteTasks(id:string)
    {
      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
      })
    }
  
    function updateTasks(id:string)
    {
          setEditTodo(currentEdit =>{
            return currentEdit = todos.find(todo => todo.id === id)
        });
  
          setNewItem(editTodo.title);
    }
  
      return (
      <>
        <Head>
          <title>To do list</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      />
        </Head>
        <main className={styles.main_container}>
          <div className={styles.container}>
              <h1>To do list</h1>
           <Tasks newItem = {newItem} todos={todos} deleteTasks={deleteTasks} handleCheckBox = {handleCheckBox} 
           updateTasks = {updateTasks} filterTodo = {filterTodo} />
          <Input editTodo ={editTodo} handleChange = {handleChange} 
                handleSubmit = {handleSubmit} newItem = {newItem} 
                handleUpdate = {handleUpdate}
                />
        </div>
        </main>
      </>
    )
  }




  