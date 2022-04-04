import { useContext } from "react";
import ToastMessageContext, { ToastMessageContextType } from "../context/ToastMessageContext";


export default function useToastMessageContext() {
    return useContext(ToastMessageContext) as ToastMessageContextType;
}