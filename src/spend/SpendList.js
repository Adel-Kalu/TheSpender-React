import React, { Component } from 'react';
import axios from 'axios';
import Spend from './Spend';
import SpendNewForm from './SpendNewForm';
import SpendEditForm from './SpendEditForm';
import { Alert, Button } from "react-bootstrap";

export default class SpendList extends Component {
    constructor(props){
        super(props);
        this.state = {
            spends: [],
            isEdit: false,
            isAdd: false,
            clickedSpendId : '',
            message: null,
            successMessage: null
        }
    }

    // make the loadSpendList excute automaticlly when find it down
    componentDidMount(){
        this.loadSpendList();
    }

//pring all spend list from database by axios
    loadSpendList = () => {
        axios.get("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/spend/index", 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response =>{
            console.log(response)
            this.setState({
                spends: response.data
            })
        })
        .catch(error =>{
            console.log("Error retreiving Spends !!");
            console.log(error);
        })
    }

    // add new spend to list and give you massage if success or failure
    addSpend = (spend) =>{
        axios.post("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/spend/add", spend, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                if (response.data.message == "Spend adding successfully") {
                    this.setState({
                      successMessage: "Spend adding successfully"
                    });
                        } 
                    else{
                    this.setState({
                      message: response.data.message,
                    });
                  }
                this.loadSpendList();
            })
            .catch(error =>{
                console.log("Error Adding Spend");
                console.log(error)
            });
            //remove the alert message after 3 seconds
            setTimeout(() => {
                this.setState({
                  message: false,
                  successMessage:false
                });
              }, 3000);
    }

    //delete spend by id from database by axios and give you message if success or failure
    deleteSpend= (id) =>{
        axios.delete(`https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/spend/delete?id=${id}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                if (response.data.message) {
                    this.setState({
                      successMessage: "Spend deleted successfully"
                    });
                        } 
                    else{
                    this.setState({
                      message: response.data.message,
                    });
                  }            
                      this.loadSpendList();
            })
            .catch(error =>{
                console.log("Error Deleting Spend!")
                console.log(error)
            });
             
            //remove the alert message after 3 seconds
            setTimeout(() => {
                this.setState({
                  message: false,
                  successMessage:false
                });
              }, 3000);
    }

    // change the view when you press the edit button
    editView =(id) =>{
        this.setState({
            isEdit: !this.state.isEdit,
            clickedSpendId: id
        })
    }

    // change the view when you press the add button
    addView =() =>{
        this.setState({
            isAdd: !this.state.isAdd
        })
    }

    //edit spend in database by axios and give ypu message if success or faill
    editSpend = (spend) =>{
        axios.put("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/spend/edit", spend, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                if (response.data.message == "Spend editing successfully") {
                    this.setState({
                      successMessage: "Spend editing successfully"
                    });
                        } 
                    else{
                    this.setState({
                      message: response.data.message,
                    });
                  }
                this.loadSpendList();
            })
            .catch(error =>{
                console.log("Error Editing Spend");
                console.log(error)
            });

            //remove the alert message after 3 seconds
            setTimeout(() => {
                this.setState({
                  message: false,
                  successMessage:false
                });
              }, 3000);
    }


    render() {

        // allert to view the message 
        const message = this.state.message ? (
            <Alert variant="danger">{this.state.message}</Alert>
          ) : null;
      
          const successMessage = this.state.successMessage ? (
            <Alert variant="success">{this.state.successMessage}</Alert>
          ) : null;
      
        return (
            <div>
                {/* show information here */}
                  {message} {successMessage}
                  <Button variant="primary" onClick={()=>{this.addView()}} block>View Add Spend</Button>
                  {/* check if add button click it to view form or hidden */}
                {(this.state.isAdd) ? <SpendNewForm addSpend={this.addSpend} email={this.props.email}/> : null}

                <h1>Spend List</h1>
                <ul>
                    {/*loop to genrate all spend in the list */}
                    {this.state.spends.map((spend, index) =>
                    <div  key={index}>
                    {/*send some value to spend compount and view compount */}
                    <Spend {...spend} deleteSpend ={this.deleteSpend} email={this.props.email} editView={this.editView}/>
                     {/* check if edit button click it to view form or hidden by id of spend */}
                    {(this.state.isEdit && this.state.clickedSpendId === spend.id) ? <SpendEditForm  spend={spend} editSpend={this.editSpend}/> : null}
                   
                    </div>)}
                    
                </ul>
            </div>
        )
    }
}
