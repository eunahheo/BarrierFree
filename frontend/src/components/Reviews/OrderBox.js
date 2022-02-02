import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Temp from "../../Temp.js";
import { Link, useNavigate } from "react-router-dom";

// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//   const backgroundColor =
//     theme.palette.mode === "light"
//       ? theme.palette.grey[100]
//       : theme.palette.grey[800];
//   return {
//     backgroundColor,
//     height: theme.spacing(3),
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightRegular,
//     "&:hover, &:focus": {
//       backgroundColor: emphasize(backgroundColor, 0.06),
//     },
//     "&:active": {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(backgroundColor, 0.12),
//     },
//   };
// }); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const OrderBox = () => {
  const navigate = useNavigate();
  return (
    <div role="presentation">
      {/* <button onClick={navigate("/")}>최신순</button>
      <button onClick={navigate("/reviewpage/order-by-bf")}>전체 인기순</button> */}
      <button>이번주 인기순</button>
      <button>베프만</button>

      {/* <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="최신순"
          // icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          onclick={navigate("/orderby-bf")}
          component="a"
          href="#"
          label="베프만"
        />
        <StyledBreadcrumb
          onclick={navigate("/orderby-bf")}
          label="인기순"
          deleteIcon={<ExpandMoreIcon />}
        />
      </Breadcrumbs> */}
    </div>
  );
};

export default OrderBox;
