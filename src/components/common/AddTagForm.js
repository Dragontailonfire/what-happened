import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import * as eventActions from "../../redux/actions/eventItemActions";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import ClearIcon from "@mui/icons-material/RemoveCircleTwoTone";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import * as TextUtils from "../../utilities/TextUtils";
import { InputAdornment } from "@mui/material";

export default function AddTagForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    clearErrors,
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
        <Box sx={{ display: 'flex' }}>
          <TextField
            {...register("tagName", {
              required: true,
              maxLength: 10,
              validate: validateTagName,
            })}
            id="addTagText"
            name="tagName"
            size="small"
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  {isDirty && errors.tagName ? (
                    <IconButton
                      type="reset"
                      onClick={() => {
                        reset();
                        clearErrors();
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
            placeholder="Tag name"
            error={!!errors.tagName}
            label={
              errors.tagName && errors.tagName.type === "validate"
                ? "You already have this Tag"
                : "Add a tag"
            }
            helperText={
              errors.tagName &&
              errors.tagName.type === "maxLength" &&
              "This tag is very lengthy"
            }
          />
        </Box>
      </form>
    </>
  );
}
