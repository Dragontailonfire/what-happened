import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import * as TextUtils from "../utilities/TextUtils";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import * as eventActions from "../redux/actions/eventItemActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import UpdateIcon from "@material-ui/icons/UpdateTwoTone";
import ClearIcon from "@material-ui/icons/ClearRounded";
import isAfter from "date-fns/isBefore";

export const EventForm = (props) => {
  const {
    watch,
    handleSubmit,
    errors,
    reset,
    control,
    setValue,
    getValues,
    formState,
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
      completedEvent: false,
      endDate: new Date(),
      setReminder: false,
      lastEditedDate: "",
      edit: false,
      eventTags: [],
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.edit) {
      setTimeout(() =>
        setValue([
          { id: props.id },
          { title: props.title },
          { startDate: props.startDate },
          { description: props.description },
          { checkedDays: props.checkedDays },
          { checkedMonths: props.checkedMonths },
          { checkedYears: props.checkedYears },
          { completedEvent: props.completedEvent },
          { setReminder: props.setReminder },
          { lastEditedDate: props.lastEditedDate },
          { eventTags: props.tags },
        ])
      );
    }
    if (props.completedEvent) {
      setTimeout(() => setValue([{ endDate: props.endDate }]));
    }
  }, [setValue, props]);

  const eventTagOptions = useSelector((state) => state.eventTags);
  const dispatch = useDispatch();
  const filter = createFilterOptions();
  const completedEventSwitch = watch("completedEvent");

  const validateEndDate = (endDate) => {
    let start = getValues("startDate");
    let isEnded = getValues("completedEvent");
    let errorCondition = isAfter(new Date(endDate), new Date(start));
    if (isEnded && errorCondition) return false;
    return true;
  };

  const onSubmit = (data) => {
    props.closePanel();
    data.tags = assignTags(data.eventTags);
    delete data.eventTags;
    data.lastEditedDate = new Date().toISOString();
    data.edit = false;
    if (props.edit) {
      data.id = props.id;
      if (!data.completedEvent) {
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
    props.closePanel();
  };

  const assignTags = (tags) => {
    let activeTags = [];
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
    return activeTags;
  };

  const handleCancelEdit = () => {
    props.closePanel();
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
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Controller
            as={TextField}
            fullWidth
            color="secondary"
            variant="outlined"
            label={
              errors.title && errors.title.type === "required"
                ? "Give a title to this Event"
                : "Title"
            }
            name="title"
            margin="none"
            id="title"
            size="small"
            placeholder="What happened"
            rules={{ required: true, maxLength: 30 }}
            control={control}
            error={errors.title ? true : false}
            helperText={
              errors.title &&
              errors.title.type === "maxLength" &&
              "This title is too long"
            }
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              as={KeyboardDatePicker}
              name="startDate"
              control={control}
              autoOk
              fullWidth
              rules={{ required: true }}
              error={errors.startDate ? true : false}
              size="small"
              inputVariant="outlined"
              variant="inline"
              format="dd/MM/yyyy"
              color="secondary"
              id="startDate"
              label="Start date"
              KeyboardButtonProps={{
                "aria-label": "change start date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            color="secondary"
            size="small"
            margin="none"
            fullWidth
            //multiline
            variant="outlined"
            name="description"
            id="description"
            placeholder="The details"
            label="Description"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            id="eventTags"
            name="eventTags"
            control={control}
            onChange={(event) => {
              return event[1];
            }}
            as={
              <Autocomplete
                multiple
                freeSolo
                blurOnSelect
                autoHighlight
                filterSelectedOptions
                selectOnFocus
                limitTags={3}
                ChipProps={{ color: "primary", size: "small" }}
                /* ChipProps={(eventTagOptions) => {
                    let existingTag = eventTagOptions.filter(
                      ((opt) => color: opt.colour)
                    );
                  }} */
                options={eventTagOptions}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  let existingTag = options.filter((opt) =>
                    TextUtils.TextCompare(opt.tagName, params.inputValue)
                  );
                  // Suggest the creation of a new value
                  if (params.inputValue !== "" && existingTag.length === 0) {
                    filtered.push({
                      newTag: params.inputValue,
                      tagName: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.newTag) {
                    return option.newTag;
                  }
                  // Regular option
                  return option.tagName;
                }}
                renderOption={(option) => option.tagName}
                //defaultValue={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    color="secondary"
                    size="small"
                    placeholder="Assign tags"
                  />
                )}
                /* renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        color="primary"
                        variant="default"
                        label={option.tagName}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  } */
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              disabled={!completedEventSwitch}
              as={KeyboardDatePicker}
              name="endDate"
              fullWidth
              control={control}
              autoOk
              size="small"
              inputVariant="outlined"
              rules={{
                required: true,
                validate: validateEndDate,
              }}
              error={errors.endDate ? true : false}
              helperText={errors.endDate && "Event start is after this date"}
              variant="inline"
              format="dd/MM/yyyy"
              color="secondary"
              id="endDate"
              label="End date"
              KeyboardButtonProps={{
                "aria-label": "change end date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid hidden item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Counter format</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Controller
                    as={Checkbox}
                    type="checkbox"
                    control={control}
                    name="checkedDays"
                    id="checkedDays"
                    color="primary"
                  />
                }
                label="Days"
              />
              <FormControlLabel
                control={
                  <Controller
                    as={Checkbox}
                    type="checkbox"
                    control={control}
                    name="checkedMonths"
                    id="checkedMonths"
                    color="primary"
                  />
                }
                label="Months"
              />
              <FormControlLabel
                control={
                  <Controller
                    as={Checkbox}
                    type="checkbox"
                    control={control}
                    name="checkedYears"
                    id="checkedYears"
                    color="primary"
                  />
                }
                label="Years"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs="auto">
          <FormControl margin="dense" component="fieldset">
            <FormControlLabel
              control={
                <Controller
                  as={Checkbox}
                  type="checkbox"
                  control={control}
                  name="completedEvent"
                  id="completedEvent"
                  color="secondary"
                />
              }
              label="Completed Event"
            />
          </FormControl>
        </Grid>
        <Grid item xs="auto">
          <FormControl margin="dense" component="fieldset">
            <FormControlLabel
              control={
                <Controller
                  as={Checkbox}
                  type="checkbox"
                  control={control}
                  name="setReminder"
                  id="setReminder"
                  color="secondary"
                />
              }
              label="Set Reminder"
            />
          </FormControl>
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
              //startIcon={<CancelIcon />}
              //endIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          ) : (
            /* formState.dirty && */ <Button
              variant="outlined"
              color="secondary"
              id="clear"
              size="medium"
              type="reset"
              onClick={() => {
                props.closePanel();
                reset();
              }}
            >
              Clear
            </Button>
          )}
        </Grid>
        <Grid item xs="auto">
          <Button
            hidden={!formState.dirty}
            variant="contained"
            color="primary"
            name="saveEvent"
            size="medium"
            id="saveEvent"
            type="submit"
            //startIcon={props.edit ? <UpdateIcon /> : <SaveIcon />}
            //endIcon={props.edit ? <UpdateIcon /> : <SaveIcon />}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

//Use with counter components
/* <Grid item xs={12}>
          <FormControl margin="dense" component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Controller
                    as={Switch}
                    type="checkbox"
                    control={control}
                    name="completedEvent"
                    id="completedEvent"
                    color="secondary"
                  />
                }
                label="End event"
              />
              <FormControlLabel
                control={
                  <Controller
                    as={Checkbox}
                    type="checkbox"
                    control={control}
                    name="setReminder"
                    id="setReminder"
                    color="secondary"
                  />
                }
                label="Set Reminder"
              />
            </FormGroup>
          </FormControl>
        </Grid> */
