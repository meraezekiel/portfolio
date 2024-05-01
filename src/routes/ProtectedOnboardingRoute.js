import { Navigate} from "react-router-dom";
import { decryptData } from "../functionsHelper/cryptoData";
export const ProtectedOnboardingRoute = ({ children }) => {
    const license = decryptData('license');
    const user = decryptData('user');
    if (license === null && user ===null) {
        return  <Navigate to="/" />
    } else {
        return children;
    }
};