import React from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import environment from "../../environment";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class MultipleFileUploadWithPreview extends React.Component {

	 state = {
	 	uploadedFiles: [],
	 	previewVisible: false,
		 previewImage: "",
		 previewTitle: "",
		 fileList: [],
	 };
	 handleCancel = () => this.setState({ previewVisible: false });

	 handlePreview = async file => {
	 	if (!file.url && !file.preview) {
	 		file.preview = await getBase64(file.originFileObj);
	 	}
	 	this.setState({
	     previewImage: file.url || file.preview,
	     previewVisible: true,
	     previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
	   });
	 };

	 handleChange = ({ fileList }) => this.setState({ fileList });

	 dummyRequest = async ({file, onSuccess}) => {
		 let formData = new FormData();
		 formData.append("file", file);
		 await axios({
			 url: `${environment.baseUrl}general/files`,
			 method: "POST",
			 data: formData,
			 headers: { "Content-Type": "multipart/form-data" },
		 }).then((res) => {
			 onSuccess("ok");
			 this.setState(prevState => ({
				 uploadedFiles: [...prevState.uploadedFiles, res.data.key]
			 }));
			 this.props.onChange(this.state.uploadedFiles);
		 }).catch((err) => {
			 console.log("Error", err);
		 });
	 };

	 render() {

	 	const { previewVisible, previewImage, fileList, previewTitle } = this.state;
	 	const uploadButton = (
	 		<div>
	       <PlusOutlined />
	       <div style={{ marginTop: 8 }}>Upload</div>
	 		</div>
	   );
	 	return (
	 		<>
	       <Upload
			   customRequest={this.dummyRequest}
	         listType="picture-card"
	         fileList={fileList}
	         onPreview={this.handlePreview}
	         onChange={this.handleChange}
	       >
	         {fileList.length >= 8 ? null : uploadButton}
	       </Upload>
	       <Modal
	         visible={previewVisible}
	         title={previewTitle}
	         footer={null}
	         onCancel={this.handleCancel}
	       >
	         <img alt="example" style={{ width: "100%" }} src={previewImage} />
	       </Modal>
	     </>
	   );
	 }
}
