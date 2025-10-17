import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import FarmerDashboard from '../pages/Farmer/FarmerDashboard';
import CreateJob from '../pages/Farmer/CreateJob';
import Weather from '../pages/Farmer/Weather';
import CropPrediction from '../pages/Farmer/CropPrediction';

const FarmerRoutes = () => {
  return (
    <>
      <Route
        path="/farmer/dashboard"
        element={
          <ProtectedRoute allowedUserType="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/create-job"
        element={
          <ProtectedRoute allowedUserType="farmer">
            <CreateJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/weather"
        element={
          <ProtectedRoute allowedUserType="farmer">
            <Weather />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/crop-prediction"
        element={
          <ProtectedRoute allowedUserType="farmer">
            <CropPrediction />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default FarmerRoutes;
