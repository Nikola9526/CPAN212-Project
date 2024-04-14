import React , {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import  axios from 'axios';










function Home ( {onLogout, token , username}) {
    const nav = useNavigate();

// once loggned in genic recipe view shows everyones recipes on db 

const [recipes, setRecipes] = useState([]);

useEffect(() => {
    fetch('http://localhost:9000/recipes')
    .then(response => response.json())
    .then(data => setRecipes(data))
    .catch(error => console.error("Error fetching the recipes:", error));

}, []);


    return (
      <div style={{ padding: 15}}>
      
      <Card >
        <Card.Body style={{ padding: 15, textAlign: 'center'}}>
          <Card.Title><h1>Recipes Welcome Back, {username}</h1><h2>{token}</h2></Card.Title>
        </Card.Body>
      </Card>
       
        {recipes.map((recipe, index) => (
          <Card style={{ width: "38rem", margin: 50, padding: 20 }} key={index}>
            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{recipe.description}</Card.Subtitle>
              <Card.Text>
                Info:
                <ul>
                  {recipe.info.map((info, indexinfo) => (
                    <li key={indexinfo}>{info}</li>
                  ))}
                </ul>
              </Card.Text>
              <Card.Text>
              Serves: {recipe.servingsize} People
              </Card.Text>
              <Card.Text>
              Ingredients:
              <ul>
                {recipe.ingredients.map((ingredients, indexing) => (
                  <li key={indexing}>{ingredients}</li>
                ))}
              </ul>
              </Card.Text>
              <Card.Text>
                Directions:
                <ul>
                {recipe.directions.map((directions, indexDir) => (
                  <li key={indexDir}>{directions}</li>
                ))}
              </ul>
              </Card.Text>
              <Card.Text>
                    {recipe.note}

              </Card.Text>
              <Card.Text>
               Posted By: {recipe.user}
              </Card.Text>
              <Card.Text><Button onClick={ () => nav('/Profile')}>Comment</Button></Card.Text>
            </Card.Body>
          </Card>
        
        ))}
        <div>

        </div>
        
        <Button style={{ padding: 10, marginRight: 10}} variant='primary' type="exit" onClick={() => nav('/Profile')}>Profile</Button>
       
        <Button style={{ padding: 10, marginLeft: 10}} variant='primary' type="submit" onClick={() => nav('/AddRecipe')}>Add Recipe</Button>
       
      </div>
    );
}
export default Home;