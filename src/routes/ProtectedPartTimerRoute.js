import { Navigate} from "react-router-dom";
import { decryptData } from "../functionsHelper/cryptoData";
export const ProtectedPartTimerRoute = ({ children }) => {
    const partimerData = decryptData('partimerData');
    if (partimerData === null) {
        return  <Navigate to="/" />
    } else {
        return children;
    }
};