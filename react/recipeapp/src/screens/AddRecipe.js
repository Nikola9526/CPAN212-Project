import React , {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddRecipe ({token}) {

    const nav = useNavigate();

    const [name , setName] = useState('');
    const [description , setDescription] = useState('');
    const [info , setInfo] = useState('');
    const [servingsize , setServingsize] = useState('');
    const [ingredients , setIngredients] = useState('');
    const [directions , setDirections] = useState('');
    const [note , setNote] = useState('');

    const handleSubmit = async (e) => {
        const dataArray1 = info.split(','); // info
        const dataArray2 = ingredients.split(',');
        const dataArray3 = directions.split(',');
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/recipeAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                 name,
                 description,
                 info: dataArray1,
                 servingsize,
                 ingredients: dataArray2 ,
                 directions: dataArray3,
                 note
                })
        });

        if (response.ok) {
            setName('');
            setDescription('');
            setInfo('');
            setServingsize('');
            setIngredients('');
            setDirections('');
            setNote('');
           
            alert('Recipe Added!');
            nav('/Home');
            console.log('hello')


        } else {
            alert('Failed to Add Recipe!')
            
        }


        } catch (error) {
            console.error('Adding Recipe error:', error);
            alert('Can Not Add');
        }
       
    };
    const loginWrapper = {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        margin: "100px",
      }


    return (

        <div style={loginWrapper}>
      {/*Rigister Form*/}
      <h2>Add a Recipe</h2>
      <br/>
      <Form >
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type='text'
        onChange={e => setName(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description:</Form.Label>
        <Form.Control 
        type='text'
        onChange={e => setDescription(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Info:</Form.Label>
        <Form.Control 
        style={{width: '80%', padding: 55}}
        type='text'
        onChange={e => setInfo(e.target.value)}
        placeholder='Enter comma-separated Values'
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servingsize</Form.Label>
        <Form.Control 
        type='text'
        onChange={e => setServingsize(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Ingredients:</Form.Label>
        <Form.Control 
        type='text'
        onChange={e => setIngredients(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Directions:</Form.Label>
        <Form.Control 
        type='text'
        onChange={e => setDirections(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Note:</Form.Label>
        <Form.Control 
        type='text'
        onChange={e => setNote(e.target.value)}></Form.Control>
      </Form.Group>
      <br/>
      <Button variant='primary' type="submit" onClick={handleSubmit}>Submit Recipe</Button>
      </Form>
     
      </div>
    );
};
export default AddRecipe;
