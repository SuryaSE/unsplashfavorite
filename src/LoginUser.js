import React from 'react';
import './App.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import _ from 'lodash';
import { browserHistory } from 'react-router';

class LoginUser extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            emailError:'',
            passwordError:''
        };
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }

    formPreventDefault (e) {
        e.preventDefault();
        this.handleLogin();
    };

    async handleEmailChange (e) {
        if (!_.isEmpty(e.target.value)){
            await this.setState({email:e.target.value});
            await this.setState({emailError:''});
        } else {
            if ( e.target.value !== 'user@user.com'){
                await this.setState({emailError:'Wrong email!'});
            }else{
                await this.setState({emailError:'Email is mandatory!'});
            }
        }
    };

    async handlePasswordChange (e) {
        if (!_.isEmpty(e.target.value)){
            await this.setState({password:e.target.value});
            await this.setState({passwordError:''});
        } else {
            if ( e.target.value !== '123456789'){
                await this.setState({passwordError:'Wrong password!'});
            }else{
                await this.setState({passwordError:'password is mandatory!'});
            }
        }
    };

    async handleLogin () {
        if ( this.state.email !== 'user@user.com' && !_.isEmpty(this.state.email)){
            await this.setState({emailError:'Wrong email!'});
        }else{
            await this.setState({emailError:'Email is mandatory!'});
        }
        if ( this.state.password !== '123456789' && !_.isEmpty(this.state.password)){
            await this.setState({passwordError:'Wrong password!'});
        }else{
            await this.setState({passwordError:'password is mandatory!'});
        }
        const user = JSON.parse(localStorage.getItem("users"));
        if (_.some(user, {email:this.state.email, password:this.state.password})){
            localStorage.setItem("isUserLoggedIn", true);
            browserHistory.push('/');
        }
    };
  
    render (){
    return(
        <div className="App">
        <header className="App-header">
            <Form onSubmit={this.formPreventDefault}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={this.handleEmailChange} />
                    { (!_.isEmpty(this.state.emailError)) &&
                    <Alert color="danger">
                        {this.state.emailError}
                    </Alert>
                    }
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={this.handlePasswordChange} />
                    { (!_.isEmpty(this.state.passwordError)) &&
                    <Alert color="danger">
                        {this.state.passwordError}
                    </Alert>
                    }
                </FormGroup>
                <Alert color="info">
                    Use email: user@user.com & password: 123456789 for getting logged in.
                </Alert>
                <Button className='custom-btn btn px-5'>Login</Button>
            </Form>
        </header>
    </div>
    )
  };
}

export default LoginUser;
