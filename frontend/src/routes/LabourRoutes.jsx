import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import LabourDashboard from '../pages/Labour/LabourDashboard';
import AllJobs from '../pages/Labour/AllJobs';
import MyApplications from '../pages/Labour/MyApplications';
import LabourProfile from '../pages/Labour/LabourProfile';

const LabourRoutes = () => {
  return (
    <>
      <Route
        path="/labour/dashboard"
        element={
          <ProtectedRoute allowedUserType="labour">
            <LabourDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labour/jobs"
        element={
          <ProtectedRoute allowedUserType="labour">
            <AllJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labour/my-applications"
        element={
          <ProtectedRoute allowedUserType="labour">
            <MyApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labour/profile"
        element={
          <ProtectedRoute allowedUserType="labour">
            <LabourProfile />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default LabourRoutes;
