import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

    function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
        const cmts = comments.map((one) => {
            const dateS = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(one.date));

            return (
                <li key={one.id}>
                    <p>{one.comment}</p>
                    <p>-- {one.author}, {dateS}</p>
                </li>
            );
        });
        
        return (
            <div className="col-12 col-md-5 m-1">
                <h3>Comments</h3>
                <ul className="list-unstyled">{cmts}</ul>
            </div>
        );
    }

    const DishDetail = (props) => {
        const dish = props.dish;
        if(dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <RenderDish dish={dish}/>
                        <RenderComments comments={dish.comments} /> 
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;