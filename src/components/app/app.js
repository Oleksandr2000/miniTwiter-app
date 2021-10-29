import { Component } from 'react/cjs/react.production.min';

import './app.css';
import AppInfo  from '../app-info/app-info';
import AppFilter  from '../app-filter/app-filter';
import SearchPanel from '../search-panel/search-panel';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: 'Alex', salary: 900, increase: false, rise: false, id: 1},
                {name: 'Oleksandr', salary: 1900, increase: false, rise: false, id: 2},
                {name: 'Ivan', salary: 4400, increase: false, rise: false, id: 3},
            ]
        }
        this.maxId = 12;
    }

    DeleteItem = (id) =>{
        this.setState(({data}) => {
            return{
                data: data.filter(item=> item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return(
            <div className='app'>
                <AppInfo
                    employees={employees}
                    increased={increased}/>
                <div className='search-panel'>
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployersList
                    data = {this.state.data} 
                    onDelete = {this.DeleteItem}
                    onToggleProp = {this.onToggleProp}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;