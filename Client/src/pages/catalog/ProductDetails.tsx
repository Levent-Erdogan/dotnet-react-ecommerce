import { Button, CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import NotFound from "../../errors/NotFound";
import { AddShoppingCart } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currentTRY } from "../../utils/formatCurrency";

export default function ProductDetailsPage() {

    const { cart, setCart } = useCartContext();

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setisAdded] = useState(false);

    const item = cart?.cartItems.find(i => i.productId == product?.id)

    useEffect(() => {
        id && requests.Catalog.details(parseInt(id))
            .then(data => setProduct(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }, [id]);

    function handleAddItem(id: number) {
        setisAdded(true);

        requests.Cart.addItem(id)
            .then(cart => {
                setCart(cart)
                toast.success("Sepetinize eklendi")
            })
            .catch(error => console.log(error))
            .finally(() => setisAdded(false));

    }

    if (loading) return <CircularProgress />

    if (!product) return <NotFound />

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
                <img src={`http://localhost:5273/images/${product.imageUrl}`} style={{ width: "100%" }} />
            </Grid2>
            <Grid2 size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
                <Typography variant="h3"> {product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">
                    {currentTRY.format(product.price) }
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stock</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack direction="row" sx={{mt:3}} alignItems="center" spacing={2}>
                    <Button loading={isAdded} variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart />} onClick={() => handleAddItem(product.id)}>
                        Sepete Ekle
                    </Button>

                    {item?.quantity! > 0 && (
                        <Typography variant="body2"> Sepetinize {item?.quantity} adet eklendi</Typography>
                    )}
                </Stack>
            </Grid2>
        </Grid2>
    )
}