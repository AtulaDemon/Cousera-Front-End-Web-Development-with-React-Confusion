import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        const comments = item.comments.map((one) => {
            const date = new Date(one.date);
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
            const dateS = mo + " " + da + ", " + ye;

            return (
                <div key={one.id}>
                    <p>{one.comment}</p>
                    <p>-- {one.author}, {dateS}</p>
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={item.image} alt={item.name}/>
                        <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>{item.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    <div>{comments}</div>
                </div>
            </div>
        );
    }
}

export default DishDetail;