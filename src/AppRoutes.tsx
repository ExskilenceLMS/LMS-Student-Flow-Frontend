import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Roadmap from './SubjectOverview'; 
import FAQ from './Components/FAQ';
import OnlineSession from './OnlineSession';
import ReportProblem from './ReportProblem';
import Profile from './Profile';
import SubjectRoadMap from './SubjectRoadMap';
import SQLEditor from './SQLEditor';
import PyEditor from './PyEditor';
import Test from './Test'; 
import TestIntro from './TestIntroduction';
import TestSection from './TestSection';
import TestReport from './TestReport';
import HTMLCSSEditor from './HTMLCSSEditor';
import JSEditor from './JSEditor';
import Mcqtemp from './McqTemplate';
import Reports from './Reports';
import Placement from './Placement'
import Demo from './Demo';
import Login from './Login';


const AppRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<Login />} />
      <Route path = '/Dashboard' element={<Dashboard />} />
      <Route path = '/Roadmap' element={<Roadmap />} /> {/* No */}
      <Route path = '/FAQ' element={<FAQ />} />
      <Route path = '/Placement' element={<Placement />} /> {/* No */}
      <Route path = '/Reports' element={<Reports />} /> {/* No */}
      <Route path = '/Online-Session' element={<OnlineSession />} />
      <Route path = '/Report-Problem' element={<ReportProblem />} />
      <Route path = '/Profile' element={<Profile />} />
      <Route path = '/Subject-Roadmap' element={<SubjectRoadMap />} />
      <Route path = '/Sql-editor' element={<SQLEditor />} />
      <Route path = '/py-editor' element={<PyEditor />} />
      <Route path = '/html-css-editor' element={<HTMLCSSEditor />} />
      <Route path = '/js-editor' element={<JSEditor />} />
      <Route path = '/test' element={<Test />} />
      <Route path = '/test-introduction' element={<TestIntro />} />
      <Route path = '/test-section' element={<TestSection />} />
      <Route path = '/test-report' element={<TestReport />} />
      <Route path = '/mcq-temp' element={<Mcqtemp />} />
      <Route path = '/demo' element={<Demo />} />
    </Routes>
  );
};

export default AppRoutes;
