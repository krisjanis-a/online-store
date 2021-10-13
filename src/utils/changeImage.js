export default function changeImage(direction) {
  const {
    imageIndex,
    item: {
      cartItem: { gallery },
    },
  } = this.state;

  if (direction === "next") {
    if (imageIndex === gallery.length - 1) {
      this.setState({
        imageIndex: 0,
      });
    } else {
      this.setState({
        imageIndex: imageIndex + 1,
      });
    }
  }
  if (direction === "prev") {
    if (imageIndex === 0) {
      this.setState({
        imageIndex: gallery.length - 1,
      });
    } else {
      this.setState({
        imageIndex: imageIndex - 1,
      });
    }
  }
}
