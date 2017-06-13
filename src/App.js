/**
 * Created by michogarcia on 13/06/17.
 */

import React, { Component } from 'react';
import { Page, Button } from 'react-onsenui'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sum: 0
        }
    }

    handleClick() {
        this.setState({
            sum: this.state.sum += 2
        })
    }

    render() {
        return (
            <Page>
                <Button onClick={this.handleClick.bind(this)}>Suma = {this.state.sum}</Button>
            </Page>
        );
    };
}

export default App;