import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';
import { Link } from 'react-router-dom';

export default class TutorialsList extends Component {
  constructor(props) { //ทำทันที
    super(props);//ส่งให้ตัวแม่

    this.onChangeSearchTitle=this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials=this.retrieveTutorials.bind(this);
    this.refreshList=this.refreshList.bind(this);
    this.setActiveTutorial=this.setActiveTutorial.bind(this);
    this.removeAllTutorials=this.removeAllTutorials.bind(this);
    this.searchTitle=this.searchTitle.bind(this);

    

    this.state = {
      tutorials: [], 
      currentTutotrial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() { //ถูกเรียก หรือ เริ่มต้น จะทำงานทันที โดยที่เราไม่ต้องเรียก
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e){
    const searchTitle = e.target.value
    this.setState({
      searchTitle : searchTitle
    })
  }

  retrieveTutorials(){ //ดึงออกมาทั้งหมดเพื่อแสดงรายการออกมา
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
      });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList(){ //เอาไว้รีเฟรชข้อมูล และเซ็ตค่าข้อมูลใหม่ หรืออัพเดท
    this.retrieveTutorials();
    this.setState({
      currentTutotrial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index){
    this.setState({
      currentTutotrial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials(){
    TutorialDataService.deleteAll()
    .then(response => {
      this.refreshList();
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  searchTitle(){ //ค้นหาข้อมูล
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorial: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const {searchTitle, tutorials, currentTutotrial, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
            <input 
              type='text'
              className='form-control'
              placeholder='Search by title'
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchTitle}
              >
                Search</button>
              </div>  
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Tutorials List</h4>

          <ul className='list-group'>
              {tutorials && tutorials.map((tutorial,index) => (
              <li className={"list-group-item "+ (index === currentIndex ? "active" : "")}
                onClick={() => this.setActiveTutorial(tutorial, index)}
                key={index}>
                {tutorial.title}</li>
            ))}         
          </ul>

          <button 
            className='btn btn-sm btn-danger m-3' 
            onClick={this.removeAllTutorials}
            >
              RemoveAll
          </button>
        </div>
        <div className='col-md-6'>
                {currentTutotrial ? (
                <div>
                  <h4>Tutorial Detail</h4>
                  <div>
                    <label>
                      <strong>Title :</strong>
                    </label>
                    {" "}
                    {currentTutotrial.title}
                  </div>
                  <div>
                    <label>
                      <strong>Description :</strong>
                    </label>
                    {" "}
                    {currentTutotrial.description}
                  </div>
                  <div>
                    <label>
                      <strong>Status : </strong>
                    </label>
                    {" "}
                    {currentTutotrial.published ? "Published" : "Pending"}
                  </div>
                </div>
                ) : (
                <div>
                  <br/>
                  <p>Please Click on a Tutorial...</p>
                </div>
                )}
        </div>
      </div>
      
    )
  }
}
