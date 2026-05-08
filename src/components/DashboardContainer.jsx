import { useSelector } from "react-redux"
import Dashboard from "./Dashboard"
import DoctorDashboard from "./Dashboards/DoctorDashboard"
import ReceptionistDashboard from "./Dashboards/ReceptionistDashboard"
import BillingDashboard from "./Dashboards/BillingDashboard"

const DashboardContainer = () => {
    const [userInfo] = useSelector(state => {
        return [state.userroles]
    })

        const selectDashboard = () => {

            switch (userInfo?.defaultRole ?? 0) {
                case 1: // Admin
                    return  <DoctorDashboard />
                case 2: // Doctor
                    return <DoctorDashboard />
                case 3: // Pharmacist
                    return <Dashboard />
                case 4: // Receptionist
                    return <ReceptionistDashboard />
                case 5: // Cashier
                    return <BillingDashboard />
                case 6: // Ward Staff
                    return <Dashboard />
                default:
                // return <PatientMenu />    
            }
        } 
    
    return (
        <div>
            {selectDashboard()}
        </div>
    )
}

export default DashboardContainer
