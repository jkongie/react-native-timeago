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
    var nowMoment = moment();
    var agoMoment = moment(this.props.time);
    var durationMilliseconds = nowMoment.diff(agoMoment);

    if (durationMilliseconds < 60000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("s[s]");
    } else if (durationMilliseconds >= 60000 & durationMilliseconds < 3600000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("m[m]");
    } else if (durationMilliseconds > 3600000 & durationMilliseconds < 86400000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("h:mm[h]");
    } else if (durationMilliseconds >= 86400000 & durationMilliseconds < 604800000) {
      var timeAgo = moment.duration(durationMilliseconds, "milliseconds").format("d[d]");
    } else {
      var timeAgo = agoMoment.format('MM/DD/YY');;
    }
    return (
      <Text {...this.props}>{timeAgo}</Text>
    );
  }
});

module.exports = TimeAgo;
