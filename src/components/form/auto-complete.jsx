import { useEffect, useState } from "react";
import {
  Autocomplete as MuiAutocomplete,
  TextField as MuiTextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import axios from "axios";
import qs from "query-string";
import { useDebounce } from "../../utils/use-debounce";

export const AutoComplete = (props) =>  {
  const {
    control,
    name,
    endpoint,
    formatOptions = (response) => response.data,
    getOptionLabel = (option) => option.label,
    onValueChange,
    disabled = false,
    queryEndpoint = {},
    size = "medium",
    multiple = false,
    isOptionEqualToValue = (option, value) => option.id === value.id,
    filterType = "client",
    disableClearable= false
  } = props;

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const searchValue = useDebounce(inputValue);

  const queryServer = {
    ...queryEndpoint,
    ...(searchValue ? { search: searchValue, limit: 20 } : { limit: 20 }),
  };

  const query = filterType === "server" ? queryServer : queryEndpoint;

  const apiEndpoint = qs.stringifyUrl({
    url: endpoint,
    query,
  });

  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const res = await axios.get(apiEndpoint);

      const options = formatOptions(res.data);

      return options;
    },

    queryKey: [apiEndpoint, query],

    enabled: false,
  });

  useEffect(() => {
    if (open) refetch();
  }, [open, searchValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...moreField } = field;

        const error = Boolean(fieldState?.error);

        const helperText = fieldState?.error?.message;

        return (
          <MuiAutocomplete
            {...moreField}
            onChange={(_e, value) => {
              if (onValueChange) {
                onValueChange(value);
              }

              onChange(value);
            }}
            disabled={disabled}
            isOptionEqualToValue={isOptionEqualToValue}
            multiple={multiple}
            disableClearable={disableClearable}
            componentsProps={{
              popper: {
                sx: {
                  zIndex: 10000,
                },
              },
            }}
            options={data}
            filterOptions={filterType === "client" ? undefined : (x) => x}
            size={size}
            onInputChange={
              filterType === "client"
                ? undefined
                : (_event, value) => {
                    setInputValue(value);
                  }
            }
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            loading={isLoading}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
              <MuiTextField {...params} label={props.label} error={error} helperText={helperText} />
            )}
          />
        );
      }}
    />
  );
}
