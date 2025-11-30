import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as TextUtils from "../utilities/TextUtils";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import * as eventActions from "../redux/actions/eventItemActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/CancelTwoTone";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/SaveTwoTone";
import UpdateIcon from "@mui/icons-material/UpdateTwoTone";
import ClearIcon from "@mui/icons-material/ClearRounded";
import isAfter from "date-fns/isBefore";
import Switch from "@mui/material/Switch";

export const EventForm = (props) => {
  const {
    watch,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      startDate: new Date(),
      createdDate: "",
      description: "",
      checkedDays: false,
      checkedMonths: false,
      checkedYears: false,
      eventEnded: false,
      endDate: new Date(),
      annualEvent: false,
      lastEditedDate: "",
      edit: false,
      eventTags: [],
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.edit) {
      setTimeout(() => {
        setValue("id", props.id);
        setValue("title", props.title);
        setValue("startDate", props.startDate);
        setValue("description", props.description);
        setValue("checkedDays", props.checkedDays);
        setValue("checkedMonths", props.checkedMonths);
        setValue("checkedYears", props.checkedYears);
        setValue("eventEnded", props.eventEnded);
        setValue("annualEvent", props.annualEvent);
        setValue("lastEditedDate", props.lastEditedDate);
        setValue("eventTags", props.tags);
      });
    }
    if (props.eventEnded) {
      setTimeout(() => setValue("endDate", props.endDate));
    }
  }, [setValue, props]);

  const eventTagOptions = useSelector((state) => state.eventTags);
  const dispatch = useDispatch();
  const filter = createFilterOptions();
  const eventEndedSwitch = watch("eventEnded");

  const validateEndDate = (endDate) => {
    let start = getValues("startDate");
    if (isAfter(endDate, start)) return false;
    return true;
  };

  const onSubmit = (data) => {
    data.tags = assignTags(data.eventTags);
    delete data.eventTags;
    data.lastEditedDate = new Date().toISOString();
    data.edit = false;
    if (props.edit) {
      data.id = props.id;
      if (!data.eventEnded) {
        data.endDate = "";
      }
      dispatch(eventActions.updatedEventItem(data));
      enqueueSnackbar("Event '" + data.title + "' is modified!", {
        variant: "success",
      });
    } else {
      data.id = Math.random();
      data.createdDate = new Date().toISOString();
      dispatch(eventActions.createEventItem(data));
      enqueueSnackbar("Event '" + data.title + "' is created!", {
        variant: "success",
      });
    }
    reset();
  };

  const assignTags = (tags) => {
    let activeTags = [];
    if (tags) {
      tags.forEach((tag) => {
        if (tag.newTag === undefined && tag.tagName === undefined) {
          activeTags.push(tag);
        } else if (tag.newTag === undefined) {
          activeTags.push(tag.tagName);
        } else {
          dispatch(eventActions.createEventTag({ tagName: tag.newTag }));
          activeTags.push(tag.newTag);
        }
      });
    }
    return activeTags;
  };

  const handleCancelEdit = () => {
    const cancelEditData = { ...props };
    cancelEditData.edit = false;
    dispatch(eventActions.updatedEventItem(cancelEditData));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        spacing={1}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true, maxLength: 30 }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                color="primary"
                variant="filled"
                label={
                  error && error.type === "required"
                    ? "Give a title to this Event"
                    : "Title"
                }
                margin="none"
                id="title"
                size="small"
                placeholder="What happened"
                error={!!error}
                helperText={
                  error &&
                  error.type === "maxLength" &&
                  "This title is very lengthy"
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Start date"
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      variant="filled"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      error={!!error}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          {eventEndedSwitch && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: true,
                  validate: validateEndDate,
                }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="End date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        variant="filled"
                        color="secondary"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                        error={!!error}
                        helperText={error && "Event start is after this date"}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        </Grid>
        <Grid item xs={7}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Counter format</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Controller
                    name="checkedDays"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Days"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="checkedMonths"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Months"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="checkedYears"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Years"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl margin="normal" component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Controller
                    name="eventEnded"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        color="secondary"
                      />
                    )}
                  />
                }
                label="End event"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="annualEvent"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        color="secondary"
                      />
                    )}
                  />
                }
                label="Annual Event"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                color="primary"
                size="small"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                multiline
                variant="filled"
                id="description"
                label={
                  error && error.type === "maxLength"
                    ? "Add the excess information from the title here"
                    : "Description"
                }
                placeholder="The details"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="eventTags"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Autocomplete
                {...field}
                multiple
                freeSolo
                blurOnSelect
                autoHighlight
                filterSelectedOptions
                selectOnFocus
                limitTags={3}
                ChipProps={{ color: "secondary", size: "small" }}
                options={eventTagOptions}
                value={value || []}
                onChange={(_, data) => onChange(data)}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  let existingTag = options.filter((opt) =>
                    TextUtils.TextCompare(opt.tagName, params.inputValue)
                  );
                  if (params.inputValue !== "" && existingTag.length === 0) {
                    filtered.push({
                      newTag: params.inputValue,
                      tagName: `Add "${params.inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.newTag) {
                    return option.newTag;
                  }
                  return option.tagName;
                }}
                renderOption={(props, option) => (
                   <li {...props}>{option.tagName}</li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    color="primary"
                    size="medium"
                    placeholder="Assign tags"
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs="auto">
          {props.edit ? (
            <Button
              variant="contained"
              color="secondary"
              id="cancel"
              type="reset"
              size="medium"
              onClick={handleCancelEdit}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          ) : (
            isDirty && (
              <Button
                variant="text"
                color="secondary"
                id="clear"
                size="medium"
                type="reset"
                onClick={() => {
                  reset();
                }}
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
            )
          )}
        </Grid>
        <Grid item xs="auto">
          <Button
            // hidden={!isDirty} // hidden prop is not standard in MUI v5 Button, use sx or conditional rendering
            sx={{ display: !isDirty ? 'none' : 'inline-flex' }}
            variant="contained"
            color="primary"
            name="saveEvent"
            size="medium"
            id="saveEvent"
            type="submit"
            startIcon={props.edit ? <UpdateIcon /> : <SaveIcon />}
          >
            SAVE
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
