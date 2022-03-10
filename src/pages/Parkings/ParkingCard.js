import React from "react";

//Material UI
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  styled,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { CardActions } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ParkingCard = ({ parking }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {parking.name[0].toUpperCase()}
            </Avatar>
          }
          title={parking.name}
        />
        <img
          src="/images/parking/parking.png"
          alt="parking"
          width="194"
          height="194"
        ></img>
        <CardContent>
          <Typography variant="body2" color="secondary">
            {`${parking.address} - ${parking.pincode}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
            >{`Parking Title: ${parking.name}`}</Typography>
            <Typography
              paragraph
            >{`total slots: ${parking.total_slots}`}</Typography>
            <Typography
              paragraph
            >{`available slots: ${parking.available_slots}`}</Typography>
            <Typography
              paragraph
            >{`Parking owner: ${parking.owner.name}`}</Typography>
            <Typography>Book now</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default ParkingCard;
