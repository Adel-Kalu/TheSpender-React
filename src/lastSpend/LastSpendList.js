import React, { Component } from 'react';
import axios from 'axios';
import LastSpend from './LastSpend';
import { Alert } from "react-bootstrap";

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

    // make the loadLastSpendList excute automaticlly when find it down
    componentDidMount(){
        this.loadLastSpendList();
    }

//pring all last spend list from database by axios
    loadLastSpendList = () => {
        axios.get("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/lastSpend/index", 
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

    //delete last spend by id from database by axios and give you message if success or failure
    deleteLastSpend= (id) =>{
        axios.delete(`https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/lastSpend/delete?id=${id}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                if (response.data.message) {
                    this.setState({
                      successMessage: "Last Spend deleted successfully"
                    });
                        } 
                    else{
                    this.setState({
                      message: response.data.message,
                    });
                  }            
                      this.loadLastSpendList();
            })
            .catch(error =>{
                console.log("Error Deleting Last Spend!")
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
                
                <h1>Last Spend List</h1>
                <ul>
                    {/*loop to genrate all spend in the list */}
                    {this.state.spends.map((spend, index) =>
                    <div  key={index}>
                    {/*send some value to spend compount and view compount */}
                    <LastSpend {...spend} deleteLastSpend ={this.deleteLastSpend} email={this.props.email} />
                   
                    </div>)}
                    
                </ul>
            </div>
        )
    }
}
