import React, {Component} from 'react';
import {Grid, Segment, Image, Card, Icon, Rating, Label} from 'semantic-ui-react';
import {push} from "react-router-redux";
import SimplePagination from "../../../components/pagination/SimplePagination";
import {fetchListItemAction} from "../duck/actions";
import FullPagination from "../../../components/pagination/FullPagination";

class MainTable extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.items, 'this.props.items');
        
        if (!this.props.items || this.props.items.length === 0) {
            this.props.getItems()
        }
        // this.props.dispatch(fetchListItemAction)
    }

    render() {
        return (
            <div>
                <Grid stackable columns={4}>
                    {this.props.items && this.props.items.map(({id, final_price, price, name, description, created_at}) => (
                        <Grid.Column key={id}>
                            <Card centered fluid onClick={(e) => {
                                store.dispatch(push('/tour/' + id));
                            }}>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                                <Card.Content>
                                    <Card.Header>{name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{created_at}</span>
                                    </Card.Meta>
                                    <Rating icon='star' defaultRating={id % 5} maxRating={5} disabled/>
                                    <Card.Description>{description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='dollar sign'/> {`${final_price} VND`}
                                    <Label color='red' key='red'>
                                        {`-${Math.round((price - final_price) / price * 100)}%`}
                                    </Label>
                                </Card.Content>
                            </Card>
                        </Grid.Column>))}
                </Grid>
                <br/>
                <FullPagination/>
            </div>
        );
    }
}

export default MainTable;
