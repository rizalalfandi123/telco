import { Grid } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { AutoComplete } from "../../components/form/auto-complete";
import { Modal } from "../../components/modal/modal";
import { endpoints } from "../../utils/endpoints";
import qs from "query-string";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const generateInitialValues = (search) => {
  const initialValues = {
    provinsi: null,
    kabupaten: null,
    kecamatan: null,
    kelurahan: null,
  };

  if (!search) {
    return initialValues;
  }

  const objectFilter = qs.parse(search);

  if (!objectFilter["filter"]) {
    return initialValues;
  }

  const decodeFilter = JSON.parse(atob(objectFilter["filter"]));

  Object.keys(decodeFilter).forEach((key) => {
    initialValues[key] = decodeFilter[key];
  });

  return initialValues;
};

export const ModalFilterMaps = () => {
  const location = useLocation();

  console.log({location})

  const initialValues = generateInitialValues(location.search);

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const formValue = useWatch({ control });

  const navigate = useNavigate();

  const idProvinsi = (formValue.provinsi && formValue.provinsi.id) || "";

  const idKabupaten = (formValue.kabupaten && formValue.kabupaten.id) || "";

  const idKecamatan = (formValue.kecamatan && formValue.kecamatan.id) || "";

  const onSubmit = (formData) => {
    const filterData = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        filterData[key] = formData[key];
      }
    });

    const cryptQuery = btoa(JSON.stringify(filterData));

    const newLocation = qs.stringifyUrl({
      url: location.state["fallback"],
      query: { filter: cryptQuery },
    });

    navigate(newLocation);
  };

  return (
    <Modal
      title="Filter Tempat"
      dialogProps={{ maxWidth: "xs" }}
      buttonOkProps={{ children: "Terapkan", onClick: handleSubmit(onSubmit) }}
      buttonCancelProps={{ children: "Cancel" }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <AutoComplete
            control={control}
            name="provinsi"
            label="Provinsi"
            onValueChange={() => {
              setValue("kabupaten", null);
              setValue("kecamatan", null);
              setValue("kelurahan", null);
            }}
            endpoint={endpoints.list_prov}
            formatOptions={(response) => {
              return response.data.map((province) => ({
                id: province.id,
                label: province.name,
              }));
            }}
          />
        </Grid>

        <Grid item>
          <AutoComplete
            control={control}
            name="kabupaten"
            key={idProvinsi}
            disabled={!Boolean(idProvinsi)}
            label="Kabupaten"
            onValueChange={() => {
              setValue("kecamatan", null);
              setValue("kelurahan", null);
            }}
            endpoint={endpoints.list_kab(idProvinsi)}
            formatOptions={(response) => {
              return response.data.map((province) => ({
                id: province.id,
                label: province.name,
              }));
            }}
          />
        </Grid>

        <Grid item>
          <AutoComplete
            control={control}
            name="kecamatan"
            key={idKabupaten}
            disabled={!Boolean(idKabupaten)}
            label="Kecamatan"
            onValueChange={() => {
              setValue("kelurahan", null);
            }}
            endpoint={endpoints.list_kec(idKabupaten)}
            formatOptions={(response) => {
              return response.data.map((province) => ({
                id: province.id,
                label: province.name,
              }));
            }}
          />
        </Grid>

        <Grid item>
          <AutoComplete
            control={control}
            name="kelurahan"
            key={idKecamatan}
            disabled={!Boolean(idKecamatan)}
            label="Kelurahan"
            endpoint={endpoints.list_kel(idKecamatan)}
            formatOptions={(response) => {
              return response.data.map((province) => ({
                id: province.id,
                label: province.name,
              }));
            }}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
