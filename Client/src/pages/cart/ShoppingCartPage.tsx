import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import requests from "../../api/requests";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currentTRY } from "../../utils/FormatCurrency";

export default function ShoppingCartPage() {

    const { cart, setCart } = useCartContext();
    const [status, setStatus] = useState({ loading: false, id: "" });

    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id });
        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }))

    }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });
        requests.Cart.deleteItem(productId, quantity)
            .then((cart) => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: true, id: "" }))

    }


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
                                <Button loading={status.loading && status.id==="add" + item.productId} onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                                    <AddCircleOutline />
                                </Button>
                                {item.quantity}
                                <Button loading={status.loading && status.id==="del" + item.productId} onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}>
                                    <RemoveCircleOutline />
                                </Button>
                            </TableCell>
                            <TableCell align="right">{currentTRY.format(item.price * item.quantity)} ₺</TableCell>
                            <TableCell align="right">
                                <Button color="error" loading={status.loading && status.id==="del_all" + item.productId} onClick={() => {
                                    handleDeleteItem(item.productId,"del_all" + item.productId, item.quantity)
                                    toast.error("Sepetinizden silindi")
                                    }}>
                                    <Delete />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <CartSummary/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}