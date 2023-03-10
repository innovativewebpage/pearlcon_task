import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

const TagsInput = () => {
   const [tags, setTags] = React.useState([]);
   
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
	}
	
	const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
};
   
   return (
      <div className="tags-input">
         <ul>
            {tags.map((tag, index) => (
               <li key={index}>
                  <span>{tag}</span><i onClick={() => removeTags(index)}> <CloseIcon/></i>
                   
               </li>
            ))}
         </ul>
         <input type="text" onKeyUp={event => addTags(event)}
		 placeholder="Press enter to add tags" />
		 
		 
		 
	  </div>
   )
}
export default TagsInput