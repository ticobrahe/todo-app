import React, {useState, useEffect} from 'react';
import './index.css'
import Search from '../src/components/Search'
import AddTodo from '../src/components/AddTodo'
import TodoList from '../src/components/TodoList'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

function App () {
  const[items, setItems] = useState([])
  const [text, setText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [isEdit, setEdit] = useState(false)
  const[itemIndex, setItemIndex] = useState(null)
  const[itemLength, setLength] = useState(items.length)
  function handleSubmit(e){
    e.preventDefault()
    if (!text.trim().length) {
      return;
    }
    if (isEdit) {
      const itemList = [...items];
      itemList[itemIndex].text = text;
      setEdit(false)
      setItemIndex(null)
      setText("")
    } else{
    const newItem = {
      text,
        id: Date.now()
      };
      setItems(items => items.concat(newItem))
      setText("")
    }
  }

  const displayItem = () => {
    const itemList = [...items];
    const todos = itemList.filter(item => {
      return item.text
        .toLowerCase()
        .startsWith(searchText.toLowerCase());
    });
    return todos.sort((a, b) => b.id - a.id);
  };

  function handleDelete(index) {
    const itemList = [...items];
    const todos = itemList.filter(item => {
      return item.id !== index;
    });
    setItems(todos);
  }

  function handleEdit(index){
    setEdit(true)
    const itemList = [...items];
    const itemIndex = itemList.findIndex(item => item.id === index);
    setText(itemList[itemIndex].text)
    setItemIndex(itemIndex)

  }

  useEffect(()=>{
    const item = localStorage.getItem("items");
    if (item) {
      setItems(JSON.parse(item));
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("items", JSON.stringify(items));
    
  })

  useEffect(() => {
    setLength(items.length)
  }, [items])



 return(
  <div className="container">
  <div className="row">
    <div className="col-md-10">
      <div className="mt-5">
        <AddTodo
         handleSubmit = {handleSubmit}
         setText = {setText}
         text={text}
         isEdit = {isEdit}
        />
        <hr />
        <div className="ml-3 mt-3">
        <div>
          <button className="btn btn-primary">Count
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={itemLength}  timeout={{enter:300, exit:300}}>
              <span className="badge badge-light">{itemLength}</span>
            </CSSTransition>
          </TransitionGroup>
          </button>
        </div>
        <Search
          setSearchText = {setSearchText}
          searchText = {searchText}
        />
        <br/>
          <table className="table">
            <thead>
              <tr>
                <th>Todo Item</th>
                <th>Time Added</th>
                <th></th>
              </tr>
            </thead>
            <TransitionGroup component='tbody' id="tr-todo">
            {displayItem().map(item=> (
              <CSSTransition key={item.id} classNames="item" timeout={{enter:500, exit:500}}>

              <TodoList
                key={item.id}
                id={item.id}
                item={item}
                handleDelete = {handleDelete}
                handleEdit = {handleEdit}
                />
                </CSSTransition>
            ))}
            </TransitionGroup>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
 )
  
}


export default App;
