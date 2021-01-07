import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dish = this.props.dish;
        if(dish != null) {
            const comments = dish.comments.map((one) => {
                const dateS = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(one.date));

                return (
                    <li key={one.id}>
                        <p>{one.comment}</p>
                        <p>-- {one.author}, {dateS}</p>
                    </li>
                );
            });

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h3>Comments</h3>
                            <ul className="list-unstyled">{comments}</ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;