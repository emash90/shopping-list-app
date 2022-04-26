import Header from './Header'
import AddItem from './AddItem'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'
const [items, setItems] = useState([])
const [newItem, setNewItem] = useState('')

useEffect(()=> {
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const listItems = await response.json()
      setItems(listItems)
    } catch (error) {
      console.log(error.message);
    }
  }

fetchItems()

}, [])

const addItem = async (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1
  const myNewItem = { id, checked: false, item }
  const listItems = [...items, myNewItem]
  setItems(listItems)

  const postOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL, postOptions)
  if(result) {}
}
  const handleCheck = async (id) => {
    const listItems = items.map((item)=> item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems)

    const myItems = listItems.filter((item) => item.id === id)
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItems[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    
  }
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

const deleteOptions = { method: 'DELETE'}
const reqUrl = `${API_URL}/${id}`
const result = await apiRequest(reqUrl, deleteOptions)

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return
    addItem(newItem)
    setNewItem('')
  }  
    return (
      <div className="App">
        <Header title="Grocery List" />
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <Content 
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}         
        />
        <Footer 
          length={items.length}
        />
      </div>
    );
  }

export default App;
