import React from "react";
import PropTypes from 'prop-types'

function TodoList(props) {
    
  return (
    <tr>
      <td>{props.item.text}</td>
      <td>{new Date(props.item.id).toLocaleString()}</td>
      <td>
        <button
          className="ml-3 btn btn-primary"
          onClick={() => {
            props.handleEdit(props.id);
          }}
        >
          Edit
        </button>
        <button
          className="ml-3 btn btn-danger"
          onClick={() => {
            props.handleDelete(props.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

TodoList.propTypes = {
    item: PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.number
    })
}

export default TodoList;
