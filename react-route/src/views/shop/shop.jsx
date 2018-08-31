import React from 'react';
import { Route} from 'react-router-dom'
import Message from './subpage';
class Shop extends React.Component {
    state = {
        redirect: "dssaa",
        match: {
            url:'/',
            params: {
                id: '23'
            }
        }
    }
    handleOnClick = (e) =>{
        e.preventDefault();
        console.log(this.state)
        this.setState({redirect: "dsd"});
    }
    render() { 
        return (
            <div>
                <h2>Topics</h2>
                <Route path={`${this.state.match.url}/messages/:id`} component={Message}/>
            </div>
        );
    }
}

export default Shop;