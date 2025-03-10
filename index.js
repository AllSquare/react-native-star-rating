'use strict';

// React and react native imports
import {
  StyleSheet,
  View
} from 'react-native';

import React, {
  Component,
  PropTypes
} from 'react';

// Third party imports
import Button from 'react-native-button';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIconsIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import ZocialIcons from 'react-native-vector-icons/Zocial';

const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  FontAwesome: FontAwesomeIcons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons
};

class StarRating extends Component {

  constructor(props) {
    super(props);

    // Round rating down to nearest .5 star
    const roundedRating = this.round(this.props.rating);
    this.state = {
      maxStars: this.props.maxStars,
      rating: this.round(this.props.rating)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: this.round(nextProps.rating)
    });
  }

  round(number) {
    return (Math.round(number * 2) / 2);
  }

  pressStarButton(rating) {
    this.props.selectedStar(rating);
    this.setState({
      rating: rating
    });
  }

  render() {
    var starsLeft = this.state.rating;
    const starButtons = [];
    for (var i = 0; i < this.state.maxStars; i++) {
      const Icon = iconSets[this.props.iconSet];
      var starIconName = this.props.emptyStar;
      var starIconColor = this.props.emptyColor;
      if (starsLeft >= 1) {
        starIconName = this.props.fullStar;
        starIconColor = this.props.fullColor;
      } else if (starsLeft === 0.5) {
        starIconName = this.props.halfStar;
        starIconColor = this.props.fullColor;
      }
      if (this.props.disabled) {
        starButtons.push(
          <View
            key={i + 1}
            style={{
              height: this.props.starSize,
              width: this.props.starSize,
            }}>
          <Icon
            name={starIconName}
            size={this.props.starSize}
            color={starIconColor}
          />
          </View>
        );
      } else {
        starButtons.push(
          <Button
            activeOpacity={0.20}
            disabled={this.props.disabled}
            key={i + 1}
            onPress={this.pressStarButton.bind(this, i + 1)}
            style={{
              height: this.props.starSize,
              width: this.props.starSize,
            }}
          >
            <Icon
              name={starIconName}
              size={this.props.starSize}
              color={starIconColor}
            />
          </Button>
        );
      }
      starsLeft--;
    }
    return (
      <View style={styles.starRatingContainer}>
        {starButtons}
      </View>
    );
  }
};

StarRating.propTypes = {
  disabled: PropTypes.bool,
  emptyStar: PropTypes.string,
  fullStar: PropTypes.string,
  halfStar: PropTypes.string,
  iconSet: PropTypes.string,
  maxStars: PropTypes.number,
  rating: PropTypes.number,
  selectedStar: PropTypes.func,
  fullColor: PropTypes.string,
  emptyColor: PropTypes.string,
  starSize: PropTypes.number
}

StarRating.defaultProps = {
  disabled: false,
  emptyStar: 'star-o',
  fullStar: 'star',
  halfStar: 'star-half-o',
  iconSet: 'FontAwesome',
  maxStars: 5,
  rating: 0,
  fullColor: 'black',
  emptyColor: 'black',
  starSize: 40
}

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default StarRating;
