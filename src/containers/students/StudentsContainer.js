import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class StudentsContainer extends Component {
  state = {
    students: [],
  }
  componentDidMount() {
    this.getStudents();
  }

  getStudents = () =>
    fetch('/api/students')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({ students: responseData.data.students });
        // console.log(this.state.students);
      })
      .catch((error) => {
        console.log('Error fetching getStudents', error);
      });

  render() {
    return (
      <Container>
        {JSON.stringify(this.state.students)}
      </Container>
    );
  }
}

export default StudentsContainer;
