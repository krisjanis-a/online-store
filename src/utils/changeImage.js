export default function changeImage(direction) {
  if (direction === "next") {
    if (this.state.imageIndex === this.state.item.cartItem.gallery.length - 1) {
      this.setState({
        imageIndex: 0,
      });
    } else {
      this.setState({
        imageIndex: this.state.imageIndex + 1,
      });
    }
  }
  if (direction === "prev") {
    if (this.state.imageIndex === 0) {
      this.setState({
        imageIndex: this.state.item.cartItem.gallery.length - 1,
      });
    } else {
      this.setState({
        imageIndex: this.state.imageIndex - 1,
      });
    }
  }
}
