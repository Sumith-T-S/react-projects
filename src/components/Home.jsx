import { Button, Card, Form } from "react-bootstrap";
function Home({ setLatitude, setLongitude, hadleSubmit, error }) {
  return (
    <Card className="custom-card">
      <Card.Body>
        <Card.Title>Weather App</Card.Title>
        <Card.Text>
          Get current weather by entering longitude and latitude
        </Card.Text>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Longitude </Form.Label>
            <Form.Control
              type="test"
              placeholder="Enter longitude"
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter latitude"
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Form.Group>
          {error && (
            <p className="error">Please enter correct longitude and latitude</p>
          )}
          <Button className="btn-rds" variant="primary" onClick={hadleSubmit}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Home;
