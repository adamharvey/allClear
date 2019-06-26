var React = require('react');

var AddList = React.createClass({

  getInitialState: function() {
    return {
      listName: ''
    }
  },
  handleChange: function(e){

    console.log("Handling change..." + e.target.value);

    this.setState({
      listName: e.target.value
    })
  },
  handleSubmit: function(e){

    console.log("Handling submit..." + this.state.listName);
    event.preventDefault();
  //  this.props.add(this.state);
      this.props.add(this.state.listName);
      this.setState({
        listName: ''
      });
  },
  render: function() {
    return (
      <div className='new-category-form'>
      <form  onSubmit={this.handleSubmit}>
      <div>
      <input type="text"
      placeholder="Category Name"
      className='category-input'
      onChange={this.handleChange}
      value={this.state.listName}/>
      <br/>
      <button className="btn btn-primary category-button">Add Issue Category</button>
      </div>
      </form>
      </div>
    )
  }
});


module.exports = AddList;
