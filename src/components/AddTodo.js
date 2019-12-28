import React from "react";
import PropTypes from 'prop-types'

function AddTodo(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        name="text"
        value={props.text}
        onChange = {e => props.setText(e.target.value)}
        className="form-control add-todo"
        placeholder="Add todo"
      />
      <p className="errormsg"></p>
      <button id="checkAll" className="btn btn-success btn-todo">
        {props.isEdit ? 'Save': 'Add'} 
      </button>
    </form>
  );
}

AddTodo.propTypes = {
    text: PropTypes.string
}

export default AddTodo;
