import React from 'react';

export default function PlayerInput(props) {
  return (
    <>
      <h1>{props.label}</h1>
      <form id={props.id} onSubmit={props.handleSubmit.bind(null)}>
        <input
          className='playersearchinput form-control'
          onChange={props.handleChange.bind(null)}
          type='text'
          name='search'
          placeholder='Github Username'
        />
        <br />
        <button type='submit' className='searchbtn btn btn-primary'>
          Search
        </button>
      </form>
    </>
  );
}
