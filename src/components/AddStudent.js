import React, { Component } from 'react';
import StudentDataService from '../services/Student.service';

export default class AddStudent extends Component {
  constructor(props){  //ทำทันที
    super(props);  // ส่งให้คลาสแม่

    this.onChangeid = this.onChangeid.bind(this)
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeUniversity = this.onChangeUniversity.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      Name: "",
      Surname: "",
      University:"",
      Graduate: false,
      submitted: false
    }
  }

  onChangeid(e) {
    this.setState({
      id: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
  }

  onChangeSurname(e) {
    this.setState({
      Surname: e.target.value
    });
  }

  onChangeUniversity(e) {
    this.setState({
      University: e.target.value
    })
  }

  saveStudent() {
    var data = {
      id: this.state.id,
      Name: this.state.Name,
      Surname: this.state.Surname,
      University: this.state.University
    };

    StudentDataService.create(data)
      .then( response => {
        this.setState({
          id: response.data.id,
          Name: response.data.Name,
          Surname: response.data.Surname,
          University: response.data.University,
          Graduate: response.data.Graduate,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  newStudent(){
    this.setState({
      id: null,
      Name: "",
      Surname: "",
      University:"",
      Graduate: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <>
            <h4>You submitted successfully</h4>
            <button className='btn btn-success' onClick={this.newStudent}>Add</button>
          </>
        ) : (
          <>
          <div className='form-group'>
              <label htmlFor='title'>ID : {this.state.id}</label>
              <input type='text' 
                className='form-control' 
                id='id' value={this.state.id}
                onChange={this.onChangeid}
                name='ID'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='title'>Name: {this.state.Name}</label>
              <input type='text' 
                className='form-control' 
                id='Name' value={this.state.Name}
                onChange={this.onChangeName}
                name='Name'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='Surname'>Surname: {this.state.Surname}</label>
              <input type='text' 
                className='form-control' 
                id='Surname' value={this.state.Surname}
                onChange={this.onChangeSurname}
                name='Surname'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='University'>University: {this.state.University}</label>
              <input type='text' 
                className='form-control' 
                id='University' value={this.state.University}
                onChange={this.onChangeUniversity}
                name='University'
                required />
            </div>
            <br/>
            <button onClick={this.saveStudent} 
              className='btn btn-success'>
                Submit
            </button>
          </>
        )}
      </div>
    )
  }
}
