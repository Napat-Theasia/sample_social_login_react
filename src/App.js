import React, { Component } from 'react';
import SocialButton from './component/SocialButton'
import Axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state = {
      password: ''
    }
  }

  render() {
    return (
      <div className="App">
        <SocialButton
          provider='facebook'
          appId='182479572492850'
          onLoginSuccess={result => this.handleSocualLogin(result, 'FACEBOOK')}
          onLoginFailure={console.log}
        > LOGIN WITH FACEBOOK </SocialButton>
        <br />
        <SocialButton
          provider='google'
          appId='805132597321-94he6amb20g0ts7mce39mrvctn3833ug.apps.googleusercontent.com'
          onLoginSuccess={result => this.handleSocualLogin(result, 'GOOGLE')}
          onLoginFailure={console.log}
        > LOGIN WITH GOOGLE </SocialButton>
        <br />
        <input type='password' onChange={this.handleInputChange} placeholder='password' value={this.state.password}/>
      </div>
    );
  }

  handleInputChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleSocualLogin = (socialData, type) => {
    console.log(socialData)
    const access_token = socialData._token.accessToken
    const baseURL = 'http://localhost:3003'
    // const baseURL = 'https://development.theasia.com'
    // const data = { access_token, type }
    const data = { access_token, type, password: this.state.password }
    Axios.post(`${baseURL}/Users/socialLogin`, data)
      .then(logInResult => { alert('login success'); console.log('login success') })
      .catch(err => {
        const error = err.response.data.error
        const error_name = error.name
        if (error_name === 'PASSWORD_IS_REQUIRE') {
          const email = error.details.email
          const message = error.message
          alert(message)
        } else if (error_name === 'PASSWORD_IS_NOT_MATCH') {
          alert('password is not match re enter password agian')
        } else {
          console.log(error_name)
        }
      })
  }
}

export default App;
