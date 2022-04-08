import React from 'react';
import ReactDom from 'react-dom';
import {useFormik} from 'formik';

const CreateJarForm = () => {
    const formik=useFormik({
        initialValues:{
            name: '',
            tags: '',
            contributors: ''
        },
        onSubmit:values => {
            alert(JSON.stringify(values));
        }
    });

    return(
        <div>
            <h2>New EJAR Form... </h2>
            <form onSubmit={formik.handleSubmit}>
                <p>
                    <label htmlFor="name">EJAR Name: </label>
                    <input type="text" name="name" id="name" value={formik.values.name}
                           onChange={formik.handleChange}></input>
                    <input type="text" name="tags" id="tags" value={formik.values.tags}
                           onChange={formik.handleChange}></input>
                    <input type="text" name="contributors" id="contributors" value={formik.values.contributors}
                           onChange={formik.handleChange}></input>
                </p>
                <button type="submit">Create EJAR</button>
            </form>
        </div>
    )
}

export default CreateJarForm;