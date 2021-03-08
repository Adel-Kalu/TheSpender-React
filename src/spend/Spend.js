import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';

export default class Spend extends Component {

    // add  spend to last spend when click button delete
    addLastSpend = (spend) =>{
        axios.post("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/lastSpend/add", spend, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{                 
                console.log(response)
            })
            .catch(error =>{
                console.log("Error Adding Last Spend");
                console.log(error)
            });
            // delete spend
            {this.props.deleteSpend(this.props.id)}
    }

    render() {
        return (
            // this compount show the spend information 
            <div className="table">
                    {/* check if the token email match email pring information */}
                {(this.props.email === this.props.userEmail) ?(
                    <div>
                <div className="row">
                    <div className="cell"><h4>{this.props.salary}</h4></div>
                    <div className="cell">{this.props.spend1}</div>
                    <div className="cell">{this.props.spend2}</div>
                    <div className="cell">{this.props.spend3}</div>
                    <div className="cell">{this.props.spend4}</div>
                    <div className="cell">{this.props.spend5}</div>
                    <div className="cell">{this.props.spend6}</div>
                    {/* button  for edit and change view*/}
                    <div className="cell"><Button variant="primary" onClick={()=>{this.props.editView(this.props.id)}}>Edit</Button></div>
                    {/*button  for add last spend and delete spend by send the id number of spend*/}
                    <div className="cell"><Button variant="danger" onClick={()=>{this.addLastSpend({userEmail:this.props.email,salary:this.props.salary,spend1:this.props.spend1,spend2:this.props.spend2,spend3:this.props.spend3,spend4:this.props.spend4,spend5:this.props.spend5,spend6:this.props.spend6})}}>Delete</Button></div>
                </div>
                <hr/>
               </div>

                  ) : null}
            </div>
 
        )
    }
}
