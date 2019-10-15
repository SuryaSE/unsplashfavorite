import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button } from 'reactstrap';
import { browserHistory } from 'react-router';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        images:[]
    };
    this.handleOnclick = this.handleOnclick.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleSeeFavorite = this.handleSeeFavorite.bind(this);
  }

  handleOnclick() {
    browserHistory.push('/login');
  }

  handleSeeFavorite() {
    browserHistory.push('/favorite');
  }

  handleFavorite(image) {
    let imagesFav = JSON.parse(localStorage.getItem("favorite"));
    const isPresent = imagesFav.some(function(el){ return el.id === image.id});
    if (!isPresent){
      imagesFav.push(image);
    }
    localStorage.setItem("favorite", JSON.stringify(imagesFav));
  }

  componentDidMount () {
    axios.get('https://api.unsplash.com/photos/?client_id=bef401c91521f0793a1aa8a2b4514467d96d7c889648a589c92232ab783c44aa')
    .then( async (response) => {
      await this.setState({images:response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  render () {
    return (
      <div className="App">
        { localStorage.getItem("isUserLoggedIn") === "false" ?
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <Button color="info" onClick={this.handleOnclick}>Unsplash APP</Button>
            </p>
          </header>
        :
          <Container className='mt-4'>
            <Row>
            {this.state.images.map(image =>
              <Col xs={12} md={4} key={image.id} className='position-relative mb-4 addCard'>
                
                  <img src={image.urls.small} className="favorite img-fluid" alt="logo" />
                  <Button color="success position-absolute btnup" onClick={()=>this.handleFavorite(image)}>Add Favorite</Button>
                 
              </Col>
            )}
            </Row>
            <Button color="info" onClick={()=>this.handleSeeFavorite()}>See Your Favorite</Button>
          </Container>
        }
      </div>
    )
  }
}

export default App;
