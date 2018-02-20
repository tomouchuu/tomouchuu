import React, { Component } from 'react';
var Color = require('color');

class HeroBG extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hue: this.props.hue,
      saturation: this.props.saturation,
      lightness: this.props.lightness,
      hex: this.getHex(this.props.hue, this.props.saturation, this.props.lightness),
    };

    if (this.props.animate) {
      this.animateBG();
    }
  }

  getHex(h, s, l) {
    var hslColor = Color.hsl(`hsl(${h}, ${s}%, ${l}%)`);
    return hslColor.hex();
  }

  animateBG() {
    this.animateId = setInterval(() => {
      const updatedHue = (this.state.hue + 1);
      this.setState({
        hue: updatedHue,
        saturation: this.state.saturation,
        lightness: this.state.lightness,
        hex: this.getHex(updatedHue, this.state.saturation, this.state.lightness),
      });
    }, `${this.props.transition}000`);
  }

  componentWillUnmount() {
    clearInterval(this.animateId);
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className} style={{
        backgroundColor: this.state.hex,
        transition: `background-color ${this.props.transition}s ease-out`
      }}>
        {this.props.children}
      </div>
    );
  }
};

export default HeroBG;