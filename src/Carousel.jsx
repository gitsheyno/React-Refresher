import React, { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="flex flex-col items-center">
        <img
          src={images[active]}
          alt="animal"
          className="max-w-lg rounded-lg mb-4"
        />
        <div className="flex justify-center">
          {images.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={`w-12 h-12 rounded-full object-cover ${
                index === active ? "border-4 border-orange-500" : ""
              }`}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
