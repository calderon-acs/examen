import { Box, CircularProgress } from "@mui/material";
import Styles from "./FullLoader.module.sass";

const FullLoader: React.FC<any> = ({ loading, into, sx, children }) => {
  return (
    <>
      {Boolean(loading) === true || loading === undefined ? (
        <Box
          className={
            Boolean(into) === true
              ? Styles["progress-spinner-into"]
              : Styles["progress-spinner"]
          }
          sx={sx}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export default FullLoader;
