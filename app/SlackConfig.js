var React = require('react');

var SlackConfig = React.createClass({
  getInitialState: function() {
    return {
      slack: window.slack
    }
  },
  handleSubmit: function(e) {
    event.preventDefault();
    this.props.firebase.child('slack').set(this.state.slack);
  },
  handleChange: function(e) {
    this.setState({
      slack: e.target.value
    })
  },
  render: function() {
    return (
      <div>
      <div className='new-category-form'>
      <form onSubmit={this.handleSubmit}>
      <div>
      <input type="text"
      placeholder="Slack Webhook URL"
      className='category-input'
      onChange={this.handleChange}
      value={this.state.slack}/>
      <br/>
      <button className="btn btn-primary category-button">Update Slack Webhook</button>
      </div>
      </form>
      </div>
      </div>
    )
  }
});

module.exports = SlackConfig;
