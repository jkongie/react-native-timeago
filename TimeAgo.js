var React = require('react-native');
var {
  PropTypes,
  Text
} = React;
var moment = require('moment');
var moment_duration = require('moment-duration-format');
var TimerMixin = require('react-timer-mixin');

var TimeAgo = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    time: PropTypes.string.isRequired,
    interval: PropTypes.number,
    hideAgo: PropTypes.bool
  },

  getDefaultProps() {
    return {
      hideAgo: false,
      interval: 60000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  },

  render() {
    nowMoment = moment();
    agoMoment = moment(this.props.time);
    durationMicroseconds = nowMoment.diff(agoMoment);
    timeAgo = moment.duration(durationMicroseconds, "milliseconds").format("h [hrs], m [min]");

    return (
      <Text {...this.props}>{timeAgo}</Text>
    );
  }
});

module.exports = TimeAgo;
