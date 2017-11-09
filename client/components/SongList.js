import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {
  constructor(props) {
    super(props)
  }

  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
    }).then(() => {
      this.props.data.refetch();
    });
  }

  renderSongs() {
    const { data } = this.props;
    if (data.loading) {
      return (<li>Loading... </li>)
    } else {
      return (
        data.songs.map(song => {
          const { title, id } = song;
          return (
            <li key={id} className="collection-item">
              <Link to={`/songs/${id}`}>{title}</Link>
              <i
                className="material-icons"
                onClick={() => this.onSongDelete(id)}
              >delete</i>
            </li>
          )
        })
      );
    }
  }

  render() {
    const { songs }  = this.props.data;

    return (
      <div>
        {songs && <ul className="collection">
          {this.renderSongs()}
        </ul>}
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        ><i className="material-icons">add</i></Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(fetchSongsQuery)(SongList)
);
