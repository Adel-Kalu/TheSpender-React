import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class SpendNewForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            newSpend : {userEmail:props.email}
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
        this.props.addSpend(this.state.newSpend);
    }
    render() {
        return (
            // input for add new value
            <div>
                 <Container>
                    <Form.Group>
                        <Form.Control type="text" name="salary" placeholder="ex:your Salary 7000" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend1" placeholder="ex: family 2000" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend2" placeholder="ex: car 1500" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend3" placeholder="ex: house 2000" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend4" placeholder="ex: mother 500" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend5" placeholder="ex: save 1000" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" name="spend6" placeholder="ex: father 500" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Button variant="primary" block onClick={this.handleSubmit}>Add Spend</Button>
                </Container>
                
            </div>
        )
    }
}
