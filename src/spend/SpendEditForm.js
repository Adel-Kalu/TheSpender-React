import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class SpendEditFrom extends Component {
    constructor(props){
        super(props);
        this.state ={
            newSpend : props.spend
        }
    }

    // change the value in the input and save it into new spend
    changeHandler= (event) =>{
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedSpend = {...this.state.newSpend}
        updatedSpend[attributeToChange] = newValue
        console.log(updatedSpend)
        this.setState({
            newSpend: updatedSpend
        })

    }

    // send new value to add spend compount
    handleSubmit =(event) =>{
        event.preventDefault()
        this.props.editSpend(this.state.newSpend);
    }
    render() {
        return (
            // input show the old value and you can edit it
            <div>
                 <Container>
                    <Form.Group>
                        <Form.Control type="text" name="salary" value={this.state.newSpend.salary} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend1" value={this.state.newSpend.spend1} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend2" value={this.state.newSpend.spend2} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend3" value={this.state.newSpend.spend3} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend4" value={this.state.newSpend.spend4} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend5" value={this.state.newSpend.spend5} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend6" value={this.state.newSpend.spend6} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    
                    <Button variant="primary" block onClick={this.handleSubmit}>Edit Spend</Button>
                </Container>
            </div>
        )
    }
}
