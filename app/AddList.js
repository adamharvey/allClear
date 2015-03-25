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
      <div>
      <form  onSubmit={this.handleSubmit}>
      <img src='logo.png'/>
      <div
      className='new-category-form'>
      <input type="text"
      placeholder="Category Name"
      className='category-input'
      onChange={this.handleChange}
      value={this.state.listName}/>{' '}
      <button className="btn btn-primary category-button">Add Issue Category</button>
      </div>
      </form>
      </div>
    )
  }
});


module.exports = AddList;
