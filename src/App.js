import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import css from "./css.module.css";
import './App.css';
//import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css';
import dataAPI from './dataAPI.js';


class App extends React.Component {
   
  render()  {
    return  (
      <BrowserRouter>
        <div>
          <ul  className={`${css.title}`}>
            <li >
              <Link to="/" className={`${css.title}`}>Home</Link>
            </li>
            <li>
              <Link to="/topics"  className={`${css.title}`}>Посты</Link>
            </li>
          </ul>
 
          <hr />
          <div className="main-route-place">
            <Route exact path="/" component={Home} />
            <Route path="/topics" component={Topics} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
 
}
 
class Home extends React.Component {
 
  render()  {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
  
}
 

 
class Topics extends React.Component {
  render( ) {
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${this.props.match.url}/rendering`}></Link>
          </li>
         
        </ul>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
        offset: 0,
        data: [],
        perPage: 10,
        currentPage: 0
    };
    this.handlePageClick = this
        .handlePageClick
        .bind(this);
}



//обработка перехода на другую стр
handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

componentDidMount() {
    this.receivedData()
}
/*получение всех постов*/
receivedData() {
  axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => {

          const data = res.data;
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
          const postData = slice.map(pd => <React.Fragment>
           <p> <Link to={'/post/'+pd.id } className={`${css.posts}`} >{pd.id}.{pd.title}</Link> </p>
           
         
          </React.Fragment>)

          this.setState({
              pageCount: Math.ceil(data.length / this.state.perPage),
             
              postData
          })
      });

/* получение поста по id */
dataAPI.getPost(this.props.match.params.postId)
            .catch(error => this.setState({error}))
            .then(post => {
                this.setState({
                    post,
                    isLoaded: (this.state.post && this.state.comments && this.state.postOwner) ? true : false,
                });
                return post;
            })
            .then(post => dataAPI.getUser(post.userId))
            .then(postOwner => this.setState({
                postOwner,
                isLoaded: (this.state.post && this.state.comments && this.state.postOwner) ? true : false,
            }));




}
render() {
    return (
        <div className={`${css.pagi}`}>
            {this.state.postData}
            <ReactPaginate
                previousLabel={"назад"} 
                nextLabel={"вперёд"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
        </div>

    )
}
}
 

 
export default App;