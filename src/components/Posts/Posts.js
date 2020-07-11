import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box } from "@material-ui/core";
import getPosts from "./../../actions/postsActions";
import { labels } from "./../../utils/labels";

class Posts extends Component {
  state = {
    redirect: false,
    url: "/comments/",
  };

  /**
   * Retrieve posts from the api
   */
  componentDidMount() {
    this.props.getPosts();
  }

  /**
   * Redirect to the comments page
   */
  goToComments(id) {
    let newState = { ...this.state };
    newState.redirect = !newState.redirect;
    newState.url = newState.url + id;
    this.setState(newState);
  }

  /**
   * Handle redirection and posts status
   * Once the posts are retrieved, the indicator disappears and the list of posts is displayed
   */
  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      const url = this.state.url;
      return <Redirect to={url} />;
    } else {
      const loading = this.props.pending;
      const posts = this.props.posts.map((post) => {
        return (
          <List key={post.id}>
            <ListItem>
              <p>{labels.userId}: </p>
              <p>{post.userId}</p>
            </ListItem>
            <ListItem>
              <p>{labels.title}: </p>
              <p>{post.title}</p>
            </ListItem>
            <ListItem>
              <p>{labels.body}: </p>
              <p>{post.body}</p>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.goToComments(post.id)}
              >
                {labels.comments}
              </Button>
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
          <h1>{labels.posts}</h1>
          {loading ? indicator : posts}
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
  return state.posts;
};

/**
 * getComments handle the posts dispatch
 */
export default connect(mapStateToProps, { getPosts })(Posts);
