import React from "react";
import Form from 'react-bootstrap/Form';
import './Select.scss'

export const MessageTypeSelect = ({ options, name, handleChange, id, value}) => {
    const MessageTypeOptions = options.map((type) => {
        return <option value={`${type}`} key={`${type}`}>{type}</option>
    });
    
    return <div className="message-type-select form-group">
        <label htmlFor="messagetypeselect" className="selected float-start">Message Type</label>
        <Form.Select onChange={handleChange} name={name} id={id} value={value}>{MessageTypeOptions}</Form.Select>
    </div>
}