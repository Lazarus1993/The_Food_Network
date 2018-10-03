import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deleteReview,
  addUseful,
  addCool,
  addFunny
} from "../../actions/reviewActions";

class ReviewItem extends Component {
  onDeleteClick(id) {
    this.props.deleteReview(id);
  }

  onUsefulClick(id) {
    this.props.addUseful(id);
  }

  onCoolClick(id) {
    this.props.addCool(id);
  }

  onFunnyClick(id) {
    this.props.addFunny(id);
  }

  findUserUseful(usefuls) {
    const { auth } = this.props;
    if (usefuls.filter(useful => useful.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  findUserCool(cools) {
    const { auth } = this.props;
    if (cools.filter(cool => cool.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  findUserFunny(funnys) {
    const { auth } = this.props;
    if (funnys.filter(funny => funny.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { review, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={review.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{review.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{review.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onUsefulClick.bind(this, review._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserUseful(review.usefuls)
                    })}
                  />
                  <span className="badge badge-light">
                    {review.usefuls.length}
                  </span>
                </button>
                <button
                  onClick={this.onFunnyClick.bind(this, review._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserFunny(review.funnys)
                    })}
                  />
                  <span className="badge badge-light">
                    {review.funnys.length}
                  </span>
                </button>
                <button
                  onClick={this.onCoolClick.bind(this, review._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserCool(review.cools)
                    })}
                  />
                  <span className="badge badge-light">
                    {review.cools.length}
                  </span>
                </button>
                {review.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, review._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ReviewItem.defaultProps = {
  showActions: true
};

ReviewItem.propTypes = {
  deleteReview: PropTypes.func.isRequired,
  addUseful: PropTypes.func.isRequired,
  addFunny: PropTypes.func.isRequired,
  addCool: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReview, addUseful, addFunny, addCool }
)(ReviewItem);
