import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import UserContext from '../User/User';
import { SaladContext } from '../SaladMaker/SaladMaker';

const useStyles = createUseStyles({
  add: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  favorite: {
    fontSize: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  image: {
    fontSize: 80
  },
  wrapper: {
    border: 'lightgrey solid 1px',
    margin: 20,
    padding: 25,
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
    width: 200,
  }
});

const reducer = key => key + 1;
export default function SaladItem({ image, name }) {
  const classes = useStyles();
  // pull out the setSalad function using destructuring. SaladMaker: <SaladContext.Provider value={{ salad, setSalad }}>
  const { setSalad } = useContext(SaladContext)
  const user = useContext(UserContext);
  const favorite = user.favorites.includes(name);

  // To make the unique id, you’ll use the useReducer Hook to increment a value on every click.
  // For the first click, the id will be 0; the second will be 1, and so on. You’ll never display
  // this value to the user; this will just create a unique value for the mapping function later.
  const [id, updateId] = useReducer(reducer, 0);
  function update() {
    setSalad({
      name,
      id: `${name}-${id}`
    })
    updateId();
  };

  // Add a click event to the button that will call the setSalad function
  return(
    <div className={classes.wrapper}>
        <h3>
          {name}
        </h3>
        <span className={classes.favorite} aria-label={favorite ? 'Favorite' : 'Not Favorite'}>
          {favorite ? '😋' : ''}
        </span>
        <button className={classes.add} onClick={update}>
          <span className={classes.image} role="img" aria-label={name}>{image}</span>
        </button>
    </div>
  )
}

SaladItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}