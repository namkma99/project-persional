import React , { Fragment } from 'react';
import ManageStudentPage from './page/manageStudent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateStudent from './page/createStudent';
import ManageClassPage from './page/manageClass';
import CheckinTime from './page/checkinTime';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/checkin" element={<CheckinTime />} />
          <Route path="/class" element={<ManageClassPage />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/edit/:id" element={<CreateStudent />} />
          <Route path="/" element={<ManageStudentPage />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
