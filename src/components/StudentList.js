import React, { Component } from 'react';
import StudentDataService from '../services/Student.service';
import { Link } from 'react-router-dom';

export default class StudentsList extends Component {
  constructor(props) { //ทำทันที
    super(props);//ส่งให้ตัวแม่

    this.onChangeSearchName=this.onChangeSearchName.bind(this);
    this.retrieveStudents=this.retrieveStudents.bind(this);
    this.refreshList=this.refreshList.bind(this);
    this.setActiveStudent=this.setActiveStudent.bind(this);
    this.removeAllStudents=this.removeAllStudents.bind(this);
    this.searchName=this.searchName.bind(this);

    

    this.state = {
      students: [], 
      currentStudent: null,
      currentIndex: -1,
      searchStudent: ""
    };
  }

  componentDidMount() { //ถูกเรียก หรือ เริ่มต้น จะทำงานทันที โดยที่เราไม่ต้องเรียก
    this.retrieveStudents();
  }

  onChangeSearchName(e){
    const searchName = e.target.value
    this.setState({
      searchName : searchName
    })
  }

  retrieveStudents(){ //ดึงออกมาทั้งหมดเพื่อแสดงรายการออกมา
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
      });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList(){ //เอาไว้รีเฟรชข้อมูล และเซ็ตค่าข้อมูลใหม่ หรืออัพเดท
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index){
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  removeAllStudents(){
    StudentDataService.deleteAll()
    .then(response => {
      this.refreshList();
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  searchName(){ //ค้นหาข้อมูล
    StudentDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          student: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const {searchName, students, currentStudent, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
            <input 
              type='text'
              className='form-control'
              placeholder='Search Name'
              value={searchName}
              onChange={this.onChangeSearchName}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchName}
              >
                Search</button>
              </div>  
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Student List</h4>

          <ul className='list-group'>
              {students && students.map((student,index) => (
              <li className={"list-group-item "+ (index === currentIndex ? "active" : "")}
                onClick={() => this.setActiveStudent(student, index)}
                key={index}>
                {student.Name}{" "}{student.Surname}</li>
            ))}         
          </ul>

          <button 
            className='btn btn-sm btn-danger m-3' 
            onClick={this.removeAllStudents}
            >
            RemoveAll
          </button>
        </div>
        <div className='col-md-6'>
                {currentStudent ? (
                <div>
                  <h4>Student Detail</h4>
                  <div>
                    <label>
                      <strong>Name :</strong>
                    </label>
                    {" "}
                    {currentStudent.Name}
                  </div>
                  <div>
                    <label>
                      <strong>Surname :</strong>
                    </label>
                    {" "}
                    {currentStudent.Surname}
                  </div>
                  <div>
                    <label>
                      <strong>University :</strong>
                    </label>
                    {" "}
                    {currentStudent.University}
                  </div>
                  <div>
                    <label>
                      <strong>Status : </strong>
                    </label>
                    {" "}
                    {currentStudent.Graduate ? "Graduate" : "Didn't graduate"}
                  </div>
                </div>
                ) : (
                <div>
                  <br/>
                  <p>Please Click on a Name...</p>
                </div>
                )}
        </div>
      </div>
      
    )
  }
}
