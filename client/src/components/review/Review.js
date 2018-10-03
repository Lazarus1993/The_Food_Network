import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReviewItem from "../reviews/ReviewItem";
import Spinner from "../common/Spinner";
import { getReview } from "../../actions/reviewActions";

class Review extends Component {
  componentDidMount() {
    this.props.getReview(this.props.match.params.id);
  }

  render() {
    const { review, loading } = this.props.review;
    let reviewContent;

    if (review === null || loading || Object.keys(review).length === 0) {
      reviewContent = <Spinner />;
    } else {
      reviewContent = (
        <div>
          <ReviewItem review={review} showActions={false} />
        </div>
      );
    }

    return (
      <div className="review">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {reviewContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review
});

export default connect(
  mapStateToProps,
  { getReview }
)(Review);
