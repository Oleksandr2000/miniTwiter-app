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
                {name: 'Hello world', increase: false, rise: true, id: 1},
                {name: 'I`m complete this app',  increase: false, rise: false, id: 2},
                {name: 'I need break',  increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: ''
        }
        this.maxId = 12;
    }

    deleteItem = (id) =>{
        this.setState(({data}) => {
            return{
                data: data.filter(item=> item.id !== id)
            }
        })
    }

    addItem = (name) => {
        const newItem = {
            name, 
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

    searchEmp =(items, term) => {
        if(term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    filterPost = (items, filter) => {
        switch(filter){
            case'rise': 
                return items.filter(item => item.rise);
            case 'increase':
                return items.filter(item => item.increase);
            default: 
                return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;