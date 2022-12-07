import { Button, Card, Form } from "react-bootstrap";
function Home({
  hadleSubmit,
  setPlace,
  error,
  selectState,
  locationdata,
  setSelecetdState,
  clearData,
}) {
  return (
    <Card className="custom-card">
      <Card.Body>
        <Card.Title>Weather App</Card.Title>
        <Card.Text>Get current weather by entering location</Card.Text>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Location </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your location"
              onChange={(e) => setPlace(e.target.value)}
              disabled={selectState ? true : false}
            />
          </Form.Group>
          {selectState && (
            <>
              <Form.Label>Select State or Country </Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setSelecetdState(e.target.value)}
              >
                <option disabled selected>
                  Select State/Country
                </option>
                {locationdata.map((item, index) => (
                  <option key={index} value={index}>
                    {item.state ? item.state : item.country} : ({item.lon} -{" "}
                    {item.lat})
                  </option>
                ))}
              </Form.Select>
              <br />
            </>
          )}
          {error && <p className="error">Please enter correct location</p>}
          <Button className="btn-rds" variant="primary" onClick={hadleSubmit}>
            Submit
          </Button>{" "}
          {selectState && (
            <Button className="btn-rds" variant="primary" onClick={clearData}>
              Cancel
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Home;
