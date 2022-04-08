import React, { useState } from 'react'
import ReactDom from 'react-dom';

class CreateJarForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            jar: {
                name: '',
                tags: '',
                contributors: ''
            }
        };
    }

    changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({jar:{
                ...this.state.jar,
                [name]:value
            }});
    }

    onCreateJar = () => {
        console.log(this.state.jar)
    }

    render(){
        return(
            <div>
                <h2>New EJAR form...</h2>
                <form>
                    <p>
                        <label>eJar Name : <input type="text"
                                                  name="name"
                                                  value={this.state.jar.name}
                                                  onChange={this.changeHandler}></input>
                        </label>
                    </p>
                </form>
                <form>
                    <p>
                        <label>eJar Tags : <input type="text"
                                                  name="tags"
                                                  value={this.state.jar.tags}
                                                  onChange={this.changeHandler}></input>
                        </label>
                    </p>
                </form>
                <form>
                    <p>
                        <label>eJar Contributors : <input type="text"
                                                          name="contributors"
                                                          value={this.state.jar.contributors}
                                                          onChange={this.changeHandler}></input>
                        </label>
                    </p>
                </form>
                <button onClick={this.onCreateJar}>Create</button>
            </div>
        )
    }
}





// const CreateJar = ( {onCreate} ) => {
//
//     const [name, setName] = useState('')
//     const [tags, setTags] = useState('')
//     const onSubmit = (e) => {
//         e.preventDefault()
//         if(!name){
//             alert('Please add a Jar Name')
//             return
//         }
//         onCreate({ name, tags})
//         setName('')
//         setTags('')
//     }
//
//     return (
//         <form className='add-form' onSubmit={onSubmit}>
//             <div className='form-control'>
//                 <label>eJar Name</label>
//                 <input type='text'
//                        placeholder='Jar Name'
//                        value={name}
//                        onChange={(e) => setName(e.target.value)}
//                 />
//             </div>
//             <div className='form-control'>
//                 <label>eJar Tags</label>
//                 <input type='text'
//                        placeholder='Jar Tags'
//                        value={tags}
//                        onChange={(e) => setTags(e.target.value)}
//                 />
//             </div>
//             {/*<div className='form-control form-control-check'>*/}
//             {/*    <label>Set lock</label>*/}
//             {/*    <input type='checkbox'/>*/}
//             {/*</div>*/}
//             <input type='submit' value='Save Jar' />
//         </form>
//     )
// }

export default CreateJarForm;