import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { currentTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/CartSlice";

interface Props {
  product: IProduct
}

export default function Product({ product }: Props) {

  const {status} = useAppSelector(state=>state.cart);
     const dispatch = useAppDispatch();

  return (
    <Card>
      <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5273/images/${product.imageUrl}`} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {currentTRY.format(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button loading={status==="pendingAddItem" + product.id} loadingPosition="start" variant="outlined" size="small" startIcon={<AddShoppingCart></AddShoppingCart>} color="success"
          onClick={() => dispatch(addItemToCart({productId:product.id}))}> Sepete Ekle</Button>

        <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon></SearchIcon>} color="primary"> View</Button>
      </CardActions>
    </Card>
  );
}