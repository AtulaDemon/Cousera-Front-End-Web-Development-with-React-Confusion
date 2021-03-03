import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
 
function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errMess) {
        return (
            <h4>{errMess}</h4>
        )
    } else 
    return (
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(prop) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={prop.dish} 
                        isLoading={prop.dishesLoading} 
                        errMess={prop.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={prop.promotion}
                        isLoading={prop.promosLoading} 
                        errMess={prop.promosErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={prop.leader} />
                </div>
            </div>
        </div>
    )
}

export default Home;