import { useLocation } from "react-router-dom";
import qs from "query-string"

export const parseExistFilter = () => {
    const search = useLocation().search;
  
    if (!search) return {};
  
    const objectFilter = qs.parse(search);
  
    if (!objectFilter["filter"]) {
      return {};
    }
  
    return JSON.parse(atob(objectFilter["filter"]));
  };