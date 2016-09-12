var React = require('react')
var ReactNative = require('react-native');
var moment = require('moment');
var moment_duration = require('moment-duration-format');
var TimerMixin = require('react-timer-mixin');

var { PropTypes } = React;
var { Text } = ReactNative;

var TimeAgo = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    time: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.array,
      React.PropTypes.instanceOf(Date)
    ]).isRequired,
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
    var nowMoment = moment();
    var agoMoment = moment(this.props.time);
    var durationMilliseconds = nowMoment.diff(agoMoment);

    if (durationMilliseconds < 60000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("s[s]");
    } else if (durationMilliseconds >= 60000 & durationMilliseconds < 3600000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("m[m]");
    } else if (durationMilliseconds > 3600000 & durationMilliseconds < 86400000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("h[h]");
    } else if (durationMilliseconds >= 86400000 & durationMilliseconds < 604800000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("d[d]");
    } else {
      var timeAgo = agoMoment.format('D MMM');
    }
    return (
      <Text {...this.props}>{timeAgo}</Text>
    );
  }

});

module.exports = TimeAgo;
