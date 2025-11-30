import React from "react";
import Skeleton from "@mui/lab/Skeleton";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export default function EventItemLoader(key) {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 0,
      borderColor: theme.palette.background.default,
    },
    titleSkeleton: {
      marginLeft: "5px",
      marginTop: "5px",
      borderRadius: 0,
    },
    contentSkeleton: {
      marginLeft: "5px",
      marginRight: "5px",
      marginBottom: "5px",
      borderRadius: 0,
    },
    expandIconSkeleton: {
      marginLeft: "auto",
      marginRight: "10px",
    },
    eventIconsSkeleton: {
      marginLeft: "10px",
      marginRight: "10px",
      marginTop: "5px",
      marginBottom: "5px",
    },
  }));

  const classes = useStyles();
  return (
    <>
      <Card
        id={key}
        className={classes.root}
        variant="elevation"
        elevation={15}
      >
        <CardHeader
          title={
            <Skeleton
              className={classes.titleSkeleton}
              animation="wave"
              variant="rect"
              width={200}
              height={40}
            />
          }
        />

        <CardContent>
          <Skeleton
            className={classes.contentSkeleton}
            animation="wave"
            variant="rect"
            height={40}
            width={400}
          />
        </CardContent>
        <CardActions disableSpacing>
          <Skeleton
            className={classes.eventIconsSkeleton}
            animation="wave"
            variant="circle"
            width={40}
            height={40}
          />
          <Skeleton
            className={classes.eventIconsSkeleton}
            animation="wave"
            variant="circle"
            width={40}
            height={40}
          />
          <Skeleton
            className={classes.eventIconsSkeleton}
            animation="wave"
            variant="circle"
            width={40}
            height={40}
          />
          <Skeleton
            className={classes.eventIconsSkeleton}
            animation="wave"
            variant="circle"
            width={40}
            height={40}
          />
          <Skeleton
            className={classes.expandIconSkeleton}
            animation="wave"
            variant="circle"
            width={40}
            height={40}
          />
        </CardActions>
      </Card>
    </>
  );
}
