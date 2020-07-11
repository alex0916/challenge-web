import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box } from "@material-ui/core";
import getComments from "./../../actions/commentsActions";
import { labels } from "./../../utils/labels";

class Comments extends Component {
  state = {
    redirect: false,
  };

  /**
   * Retrieve comments from the api
   */
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getComments(id);
  }

  /**
   * Redirect to the posts page
   */
  goToPosts() {
    let newState = { ...this.state };
    newState.redirect = !newState.redirect;
    this.setState(newState);
  }

  /**
   * Handle redirection and comments status
   * Once the comments are retrieved, the indicator disappears and the list of comments is displayed
   */
  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/posts" />;
    } else {
      const loading = this.props.pending;
      const comments = this.props.comments.map((comment) => {
        return (
          <List key={comment.id}>
            <ListItem>
              <p>{labels.name}: </p>
              <p>{comment.name}</p>
            </ListItem>
            <ListItem>
              <p>{labels.email}: </p>
              <p>{comment.email}</p>
            </ListItem>
            <ListItem>
              <p>{labels.body}: </p>
              <p>{comment.body}</p>
            </ListItem>
            <Divider className="divider" />
          </List>
        );
      });
      const indicator = (
        <Box className="progress">
          <h2>{labels.loading}</h2>
          <LinearProgress />
        </Box>
      );
      return (
        <div className="root">
          <h1>{labels.comments}</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.goToPosts()}
          >
            {labels.goBack}
          </Button>
          {loading ? indicator : comments}
        </div>
      );
    }
  }
}

/**
 * Pass state to the connected component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return state.comments;
};

/**
 * getComments handle the comments dispatch
 */
export default connect(mapStateToProps, { getComments })(Comments);
