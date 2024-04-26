import React, { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      //ToDo : Change the style from tailwind to css
      <div className="flex flex-col items-center">
        <img
          src={images[active]}
          data-testid="hero"
          alt="animal"
          className="max-w-lg rounded-lg mb-4"
        />
        <div className="flex justify-center">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              data-testid={`thumbnail${index}`}
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
