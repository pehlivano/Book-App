import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { IBook } from './Models/interface';
import { Button, Form, Modal, Card } from 'react-bootstrap'
import { useForm, SubmitHandler } from 'react-hook-form';

const colorDarkPrimary = '#0A0908';
const colorDarkSecondary = "#22333B";
const colorLightPrimary = '#A9927D';
const colorLightSecondary = "#5E503F";
const colorBackground = "#F2F4F3"

function App() {

  const { register, formState: {errors}, handleSubmit } = useForm<IBook>();

  const [books, setBooks] = React.useState<IBook[]>([]);

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit: SubmitHandler<IBook> = async (data) => {
    const response = await axios.post('http://localhost:3010/books', data)
    setBooks([...books, response.data])
    setShow(false)
  }
  

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get<IBook[]>('http://localhost:3010/books');
      setBooks(response.data);
    }
    fetchData()
  }, []);

  return (
    <div style={{backgroundColor: colorBackground, height: "100vh"}}>
      <div className='d-flex justify-content-center'>
        <Button className='mt-3' onClick={handleShow} style={{backgroundColor: colorDarkPrimary, border: 0}}>
          Add New Book :)
        </Button>
      </div>
      <div className='row m-0 d-flex justify-content-center'>
        {books == null ? <div>Loading...</div> : books.map(book => 
        <Card className='col-md-3 m-3' style={{backgroundColor: colorBackground}}>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2">{book.pageCount}</Card.Subtitle>
            <Card.Text>
              {book.author}
            </Card.Text>
            <hr/>
            <div className='d-flex justify-content-center'>
              <Button variant="danger">Delete</Button>
            </div>
          </Card.Body>
        </Card> )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
              <Form.Group className="mb-3" controlId="form.Title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter title" 
                  autoFocus
                  {...register("title", { required: true })}
                  {...errors.title && <div>Title is required</div>}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="form.Author"
              >
                <Form.Label>Author</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Author" 
                  autoFocus
                  {...register("author", { required: true })}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="form.PageCount"
              >
                <Form.Label>Page Count</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter Page Count" 
                  {...register("pageCount", { required: true })}
                />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
