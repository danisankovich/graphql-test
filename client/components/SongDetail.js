import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link, hashHistory } from 'react-router';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    return (
      <div>
        <Link to="/">Back</Link>

        <h3>Song Details</h3>
        {song && <div>
          <h4>{song.title}</h4>

          <LyricList lyricsList={song.lyrics}/>
          <LyricCreate songId={this.props.params.id}/>
        </div>}
        {!song && <div></div>}
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id
      }
    }
  }
})(SongDetail);
