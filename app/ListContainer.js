var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: []
    }
  },
  handleAddItem: function(newItem){
    console.log('set');
    this.setState({
      list: this.state.list.concat([newItem])
    });
  },
  handleRemoveItem: function(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  },
  render: function(){
    return (
      <div className="col-sm-6">
      <div className="col-sm-12">
      <h3 className="text-center"> {this.props.defaultItem} List </h3>
      <AddItem add={this.handleAddItem} placeholder={'new ' + this.props.defaultItem + ' item'}/>
      <List items={this.state.list} remove={this.handleRemoveItem}/>
      </div>
      </div>
    )
  }
});

module.exports = ListContainer;
