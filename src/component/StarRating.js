import { Star, StarOutline } from "@mui/icons-material";
import { Box } from "@mui/material";

const StarRating = ({ rating }) => {
  // Calculate the number of filled stars
  const filledStars = Math.floor(rating);

  // Generate an array with the remaining empty stars
  const emptyStars = new Array(5 - filledStars).fill("");

  return (
    <div className="flex items-center gap-1">
      {/* Render filled stars */}
      {Array(filledStars)
        .fill("")
        .map((_, index) => (
          <i className="bx bxs-star xl:text-lg text-yellow-400" key={index}></i>
          //   <Star
          //     className="text-yellow-500"
          //     key={index}
          //     fontSize="13px"
          //     // sx={{
          //     //   color: (theme) => `${theme.palette.warning.main} !important`,
          //     // }}
          //   />
        ))}

      {/* Render empty stars */}
      {emptyStars.map((_, index) => (
        // <StarOutline key={index} fontSize="13px" />
        <i className="bx bxs-star xl:text-lg text-[#D9D9D9]" key={index}></i>
      ))}
    </div>
  );
};

export default StarRating;
