import React, { Component } from 'react';
import {Button, Pagination, Icon} from 'semantic-ui-react';

class FullPagination extends Component {
  render() {
    return (
        <Pagination
            defaultActivePage={1}
            ellipsisItem={false}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={false}
            nextItem={false}
            boundaryRange={0}
            siblingRange={4}
            totalPages={20}
        />
    );
  }
}

export default FullPagination;
