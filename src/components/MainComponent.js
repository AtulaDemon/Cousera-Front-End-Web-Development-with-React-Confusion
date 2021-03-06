import React, { Component } from 'react';
import Header from './HeaderComponent'
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } 
  from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => {dispatch(postComment(dishId, rating, author, comment))},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => {
    dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
  },
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      const inputDish = this.props.dishes.dishes.filter((dish) => dish.featured)[0];
      const inputPromotion = this.props.promotions.promotions.filter((promo) => promo.featured)[0];
      const inputLeader = this.props.leaders.leaders.filter((leader) => leader.featured)[0];
      const inputDishesLoading = this.props.dishes.isLoading;
      const inputDishesErrMess = this.props.dishes.errMess;
      const inputPromosLoading = this.props.promotions.isLoading;
      const inputPromosErrMess = this.props.promotions.errMess;
      const inputLeadersLoading = this.props.leaders.isLoading;
      const inputLeadersErrMess = this.props.leaders.errMess;

      return (
        <Home dish={inputDish} promotion={inputPromotion} leader={inputLeader}
          dishesLoading={inputDishesLoading} dishesErrMess={inputDishesErrMess} 
          promosLoading={inputPromosLoading} promosErrMess={inputPromosErrMess} 
          leadersLoading={inputLeadersLoading} leadersErrMess={inputLeadersErrMess} />
      );
    }
    
    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} />
      );
    }

    const ContactPage = () => {
      return (
        <Contact resetFeedbackForm={this.props.resetFeedbackForm}
          postFeedback={this.props.postFeedback} />
      );
    }

    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
             <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={ContactPage} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
