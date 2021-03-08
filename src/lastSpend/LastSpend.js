import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Spend extends Component {

    render() {
        return (
            // this compount show the last spend information 
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
                      {/*  button for deleted by id number*/}
                     <div className="cell"><Button variant="danger" onClick={()=>{this.props.deleteLastSpend(this.props.id)}}>Delete</Button></div>
                </div>
                <hr/>
               </div>
                  ) : null}

            </div>
 
        )
    }
}
