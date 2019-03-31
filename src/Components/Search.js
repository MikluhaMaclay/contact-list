import React, {useState} from 'react';
import { Input } from 'reactstrap';


function Search(props) {
    const searchHandler = (e) => {
        const exp = "^("+ e.target.value + ").+";
        props.getSearch(exp);
    }
  return (
    <div>
      <Input type="search" name="search" placeholder="Search for contact..." onChange={searchHandler}/>
    </div>
  )
}

export default Search;
