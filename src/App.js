/**
 * Created by michogarcia on 13/06/17.
 */

import React, { Component } from 'react';
import {
    Page,
    Button,
    Modal
} from 'react-onsenui'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sum: 0,
            isOpen: false
        }
    }

    handleClick() {
        this.setState({
            sum: this.state.sum += 2
        })
    }

    handleInfo() {
        this.setState({
            isOpen: true
        })
    }

    render() {
        return (
            <Page renderModal={() => (<Modal isOpen={this.state.isOpen}>
                <section style={{margin: '16px'}}>
                    <p style={{opacity: 0.6}}>
                        { device.model }
                    </p>
                    <p>
                        <Button onClick={() => this.setState({isOpen: false})}>
                            Cerrar
                        </Button>
                    </p>
                </section>
            </Modal>)}>
                <Button onClick={this.handleClick.bind(this)}>Suma = {this.state.sum}</Button>
                <Button onClick={this.handleInfo.bind(this)}>Muestra info</Button>
            </Page>
        );
    };
}

export default App;