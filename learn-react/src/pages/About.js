const About = () => {
  return (
    <div className="flex mx-auto bg-orange-100 rounded-xl justify-center shadow-xl item-center w-1/2 border-collapse">
      <div className="card-body">
        <h2 className="card-title">About US!</h2>
        <p className="text-md">
          Welcome to Pizza_Hub, your go-to destination for delicious,
          hand-crafted pizzas delivered straight to your door. We pride
          ourselves on using only the freshest ingredients and offering a wide
          range of flavors to satisfy every pizza lover's cravings.
        </p>
        <strong>
          At Pizza_Hub, we’re all about convenience, quality, and community.
          Whether you're ordering for a quick lunch or a cozy night in, we've
          made it easy to enjoy your favorite pizza with just a few taps.
        </strong>
        <div className="flex justify-center">
          <p className="text-sm">
            Thank you for choosing Pizza_Hub. We’re here to serve you the best
            pizza experience, every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
