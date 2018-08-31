import React from 'react';
class Message extends React.Component {
    render() { 
        return (
            <div >
                <h1>new message</h1>
                <h2>{this.props.match.params.id}</h2>
            </div>
        );
    }
}

export default Message;