import { parseExistFilter } from "./parse-exist-filter";

export const generateFilterTitle = () => {
    const parseFilter = parseExistFilter();
  
    if (parseFilter["kecamatan"]) {
      return parseFilter.kecamatan.label
    }
  
    if (parseFilter["kabupaten"]) {
      return parseFilter.kabupaten.label
    }
  
    if (parseFilter["provinsi"]) {
      return parseFilter.provinsi.label
    }
  
    return `Indonesia`
  }