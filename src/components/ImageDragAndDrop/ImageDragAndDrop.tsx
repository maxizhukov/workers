import React, {useState} from "react";
import "./ImageDragAndDrop.css";
import {FileUploader} from "react-drag-drop-files";
import uploadImage from "../../assets/images/upload.png";

interface IProps {
	onFileChanged: (file:any) => void
}

export default function ImageDragAndDrop(props:IProps) {

  const fileTypes = ["png", "jpeg", "jpg"];
  const [file, setFile] = useState(null);
  const [dragHovered, setDragHovered] = useState(false);

  const handleChange = (file:any) => {
    setFile(file);
    props.onFileChanged(file);
  };

  return(
    <FileUploader
      handleChange={handleChange}
	  onTypeError={(err:any) => console.log(err)}
      name="file"
      types={fileTypes}
	  multiple={true}
	  onDraggingStateChange={(state:any) => setDragHovered(state)}
	  hoverTitle={" "}
    >
      <div className={dragHovered ? "imageDropContainer hovered" : "imageDropContainer"}>
		  <p>{"Click to upload or drag like it's hot"}</p>
		  <img src={uploadImage} alt="upload"/>
      </div>
    </FileUploader>
  );
}
