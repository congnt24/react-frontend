import React, { Component } from 'react';

class TourDetail extends Component {
  render() {
    return (
        <div className="TourDetail">
            DETAIL {this.props.match.params.detail_uri}
        </div>
    );
  }
}

export default TourDetail;
