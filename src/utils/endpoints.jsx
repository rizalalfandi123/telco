const host = import.meta.env["VITE_API_BASE"];

export const endpoints = {
  indo: `${host}/indo`,
  list_prov: `${host}/regency/indo`,
  list_kab: (id) => `${host}/regency/prov/${id}`,
  list_kec: (id) => `${host}/regency/kab/${id}`,
  list_kel: (id) => `${host}/regency/kec/${id}`,
  polygon_kab: (id) => `${host}/kab/${id}`,
  polygon_prov: (id) => `${host}/prov/${id}`,
  polygon_kec: (id) => `${host}/kec/${id}`,
  switcher: `${host}/switcher`,
};
