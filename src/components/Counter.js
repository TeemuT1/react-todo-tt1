import React from 'react';

class Counter extends React.Component {
    state = {
        counter: 0
    }

    render(){
        return (
            <button 
                onClick={() => { 
                    this.setState(state => ({
                            counter: state.counter + 1
                        }))
                }}
            >
            You have clicked {this.state.counter} times
            </button>
        )
    }
}
export default Counter