import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as eventActions from "../../redux/actions/eventItemActions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircleTwoTone";
import ClearIcon from "@material-ui/icons/RemoveCircleTwoTone";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import * as TextUtils from "../../utilities/TextUtils";
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function AddTagForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    errors,
    clearError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      tagName: "",
    },
  });
  const eventTagOptions = useSelector((state) => state.eventTags);
  // map = extract property values as array
  const tags = _.map(eventTagOptions, "tagName");

  const validateTagName = (value) => {
    if (
      _.findIndex(tags, function (val) {
        return TextUtils.TextCompare(val, value);
      }) > 0
    )
      return false;
    return true;
  };

  const onSubmit = (data) => {
    dispatch(eventActions.createEventTag(data));
    enqueueSnackbar("Tag '" + data.tagName + "' is created!", {
      variant: "success",
    });
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.root}>
          <TextField
            id="addTagText"
            name="tagName"
            size="small"
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  {formState.dirty && errors.tagName ? (
                    <IconButton
                      type="reset"
                      onClick={() => {
                        reset();
                        clearError();
                      }}
                    >
                      <ClearIcon color="error" fontSize="large" />
                    </IconButton>
                  ) : (
                    <IconButton type="submit">
                      <AddIcon color="primary" fontSize="large" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            inputRef={register({
              required: true,
              maxLength: 10,
              validate: validateTagName,
            })}
            placeholder="Tag name"
            error={errors.tagName ? true : false}
            label={
              errors.tagName && errors.tagName.type === "validate"
                ? "You already have this Tag"
                : "Add a tag"
            }
            helperText={
              errors.tagName &&
              errors.tagName.type === "maxLength" &&
              "This tag is very lenghty"
            }
          />
        </div>
      </form>
    </>
  );
}
