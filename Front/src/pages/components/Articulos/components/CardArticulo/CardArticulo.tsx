import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Chip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export function CardArticulo(props: any) {
  return (
    <Card sx={{ maxWidth: 250, minWidth: 250, margin: "20px" }}>
      <CardMedia
        component="img"
        alt="Producto"
        height="140"
        sx={{ width: "fit-content", margin: "auto" }}
        image={props.item.Imagen}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`$${props.item.Precio}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item.Descripcion}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Chip label={`Stock ${props.item.Stock}`} />
        <IconButton>
          <AddShoppingCartIcon fontSize="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
