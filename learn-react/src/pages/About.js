
import Card from 'react-bootstrap/Card';

const About = () => {
  return (

    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>About US!</Card.Title>
      {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
      <Card.Text>
      Welcome to Pizza_Hub, your go-to destination for delicious, hand-crafted pizzas delivered straight to your door. We pride ourselves on using only the freshest ingredients and offering a wide range of flavors to satisfy every pizza lover's cravings.

At Pizza_Hub, we’re all about convenience, quality, and community. Whether you're ordering for a quick lunch or a cozy night in, we've made it easy to enjoy your favorite pizza with just a few taps.
      </Card.Text>
      <Card.Link href="#">Thank you for choosing Pizza_Hub. We’re here to serve you the best pizza experience, every time.</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>

  )
}

export default About
