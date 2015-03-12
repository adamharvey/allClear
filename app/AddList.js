var React = require('react');

var AddList = React.createClass({

  getInitialState: function() {
    return {
      listName: ''
    }
  },
  handleChange: function(e){
    this.setState({
      listName: e.target.value
    })
  },
  handleSubmit: function(e){
    event.preventDefault();
  //  this.props.add(this.state);
      this.props.add(this.state.listName);
      this.setState({
        listName: ''
      });
  },
  render: function() {
    return (
      <form className="col-sm-6" onSubmit={this.handleSubmit}>
      <h3 className="text-center">Create New List</h3>
      <input type="text"
      onChange={this.handleChange}
      value={this.state.listName}/>{' '}
      <button className="btn btn-primary">Add List</button>
      </form>
    )
  }
});


module.exports = AddList;
