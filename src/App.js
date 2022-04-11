import React , { Fragment } from 'react';
import ManageStudentPage from './page/manageStudent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateStudent from './page/createStudent';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/create" element={<CreateStudent />} />
          {/* <Route path="/" element={<ManageStudentPage />} /> */}
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
