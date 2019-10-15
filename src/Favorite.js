import React from 'react';
import './App.css';
import { Container, Row, Col, Button } from 'reactstrap';
import { browserHistory } from 'react-router';

class Favorite extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            images:[]
        };
        this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
      }

    async handleRemoveFavorite (image) {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        favorite = favorite.filter(function( obj ) {
          return obj.id !== image.id;
        });
        localStorage.setItem("favorite", JSON.stringify(favorite));
        const imagesFav = JSON.parse(localStorage.getItem("favorite"));
        await this.setState({images:imagesFav});
        if (this.state.images.length === 0) {
          browserHistory.push('/');
        }
    };

    async componentDidMount () {
        const imagesFav = JSON.parse(localStorage.getItem("favorite"));
        await this.setState({images:imagesFav});
        if (this.state.images.length === 0 || localStorage.getItem("isUserLoggedIn") === "false") {
          browserHistory.push('/');
        }
    }
  
    render () {
      return(
          <Container className='mt-4'>
            <Row>
            {this.state.images.map(image => 
              <Col xs={6} md={4} className='position-relative mb-4 addCard' key={image.id}>
                <img src={image.urls.small} className="favorite img-fluid" alt="logo" />
                <Button color="danger position-absolute btnup" onClick={()=>this.handleRemoveFavorite(image)}>Remove Favorite</Button>    
              </Col>
            )}
            </Row>
          </Container>
        )
    };
}

export default Favorite;
