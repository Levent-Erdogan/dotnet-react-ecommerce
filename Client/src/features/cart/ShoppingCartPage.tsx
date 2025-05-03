import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import CartSummary from "./CartSummary";
import { currentTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart, deleteItemFromCart } from "./CartSlice";

export default function ShoppingCartPage() {

    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    if (cart?.cartItems.length === 0) return <Alert severity="warning">Sepetinizde ürün yok</Alert>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Fiyat</TableCell>
                        <TableCell align="right">Adet</TableCell>
                        <TableCell align="right">Toplam</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart?.cartItems.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <img src={`http://localhost:5273/images/${item.imageUrl}`} style={{ height: 60 }} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{currentTRY.format(item.price)} ₺</TableCell>
                            <TableCell align="right">
                                <Button loading={status === "pendingAddItem" + item.productId} onClick={() => dispatch(addItemToCart({ productId: item.productId }))}>
                                    <AddCircleOutline />
                                </Button>
                                {item.quantity}
                                <Button loading={status === "pendingDeleteItem" + item.productId +"single"} onClick={() => dispatch(deleteItemFromCart({ productId: item.productId,quantity:1,key:"single" }))}>
                                    <RemoveCircleOutline />
                                </Button>
                            </TableCell>
                            <TableCell align="right">{currentTRY.format(item.price * item.quantity)} ₺</TableCell>
                            <TableCell align="right">
                                <Button color="error" loading={status === "pendingDeleteItem" + item.productId + "all"} onClick={() => {
                                    dispatch(deleteItemFromCart({ productId: item.productId, quantity: item.quantity, key: "all" }))
                                }}>
                                    <Delete />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <CartSummary />
                </TableBody>
            </Table>
        </TableContainer>
    )
}