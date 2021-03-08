import React, { Component } from 'react'
import ProfiloEditForm from './ProfiloEditForm';
import User from "./User"
import axios from "axios";

export default class Profilo extends Component {

    state = {
        isAuth: false,
        user: null,
        users: [],
        message: null,
        successMessage: null,
      };

          // make the loadUserList excute automaticlly when find it down
      componentDidMount(){
        this.loadUserList();
    }

    //pring all user list from database by axios
    loadUserList = () => {
        axios.get("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/user/index", 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response =>{
            console.log(response.data)
            this.setState({
                users: response.data
            })
        })
        .catch(error =>{
            console.log("Error retreiving Spends !!");
            console.log(error);
        })
      }

          //edit user in database by axios and give ypu message if success or faill
      editUser = (user) =>{
        axios.put("https://cors-anywhere.herokuapp.com/http://thespender-env.eba-2jbixpmp.us-east-2.elasticbeanstalk.com/user/edit", user, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                if (response.data.message == "User editing successfully") {
                    this.setState({
                      successMessage: "User editing successfully"
                    });
                        } 
                    else{
                    this.setState({
                      message: response.data.message,
                    });
                  }
                  this.loadUserList();

            })
            .catch(error =>{
                console.log("Error Editing user");
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
            clickedUserId: id
        })
    }

    render() {
        return (
            <div>
                   {/*loop to genrate all user in the list */}
                    {this.state.users.map((user, index) =>
                    <div  key={index}>
                   {/*send some value to user compount and view compount */}
                    <User {...user}  email={this.props.email} editView={this.editView} />
                   {/* check if edit button click it to view form or hidden by id of user */}
                    {(this.state.isEdit && this.state.clickedUserId === user.id) ? <ProfiloEditForm user={user} editUser={this.editUser}/> : null}
                    </div>)}
            </div>

        )
    }
}
