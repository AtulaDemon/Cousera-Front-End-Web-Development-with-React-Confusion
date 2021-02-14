import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

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
        if(props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments} /> 
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