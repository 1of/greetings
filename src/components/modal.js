import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './modal.css';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import items from './items'
import ItemsReducer from './reducer'
import store from './connect'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    height: 250+(items.length*50)+'px',
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'relative',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 30,
  },
  header: {
    fontSize: "2em",
    margin: "5px 0 0 5px"
  },
});



class SimpleModal extends React.Component {

  state = {
    open: false, 
    items: this.props.items
  };


 handleChange = function() {
  
  };

   createItemsList= () => {
        return this.state.items.map((item) => {
            return ( 
            	<div key={item.id}>	
         <FormControl >
              <NativeSelect value={+item.input}
		            onChange={this.handleChange()}
		            name='select'
		             >
				      {this.createOptionsList()}
		          </NativeSelect>
        </FormControl>          
        <TextField value={item.input} onChange={this.handleChange()} className="amount" type="number"  margin="normal" />
        <div data-key={item.id} onClick={this.removeItem} className="modal-close-div" >&times;  </div>
           </div>
            );
        });
    }
    createOptionsList = () => {
      return this.state.items.map((item) => {
          return ( 
            <option key={item.id} value={+item.input}> 
              {item.select} 
            </option>
          );
      });
  };

 

  removeItem = (event) => {
    console.log(event.target.getAttribute("data-key"))
    let Delitem = event.target.getAttribute("data-key");
    // var array = [...this.state.items];
    // console.log("array бефоре",array)
  // let index = array.indexOf(+item);
  // array.splice(index, 1);

  let filteredArray = this.state.items.filter(item => +item.id !== +Delitem)
  console.log("array state",this.state.items)
  this.setState({items: filteredArray});
  console.log("array афтер",filteredArray)
    // this.setState({
    //     items: array
    // });
    console.log("array state",this.state.items)
};	


addItem = ()  => {
    var newItem = {id: this.state.items.length+1, 
      input: Math.round(Math.random()*100),
      select: "Test Item" + this.state.items.length } ;
      var newArr = this.state.items;
      newArr.push(newItem);
    this.setState({ items: newArr });
console.log(this.state);
getModalStyle();

  };

  handleOpen = () => {
    this.setState({ open: true,
      items: this.props.items
     });
  };

  handleClose = () => {
    this.setState({ open: false });
    
  };


  send = (state) => {
    console.log(this.state);
    this.setState({ open: false });
    store.dispatch({
      type: 'CHANGE_ITEM',
      items: this.state.items
  }
);
   

    
}


  render() {
    const { classes } = this.props;
    
    return (

      <div>

        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        > 
          <div style={getModalStyle()} className={classes.paper}>
          <div className="modal-header">
          <div className={classes.header}>{"Структура номеров"}</div> <CloseIcon onClick={this.handleClose}/>   </div>
          <form className={classes.root} autoComplete="off" >
          <div>{this.createItemsList()}</div>
          
        <Button color="primary" onClick={this.addItem}>
        Добавить 
      </Button> 

</form>

      <Button variant="contained" color="primary" onClick={this.send} >Сохранить</Button>
      <Button className={classes.button}  onClick={this.handleClose}>Отмена</Button>
          </div>
        </Modal>

      </div>
    );
  }
}


SimpleModal = connect(mapStateToProps, matchDispatchToProps)(SimpleModal);

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ItemsReducer: ItemsReducer}, dispatch)
}

function mapStateToProps (state) {
  return {
     items
  }
}


export default connect(mapStateToProps)(SimpleModalWrapped);
