// --ts kontrolleri kapatmak için ==> //@ts-nocheck  -- 
import { useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../store/store";
import { getCart } from "../features/cart/CartSlice";
import { getUSer } from "../features/account/AccountSlice";
import Header from "./Header";

function App() {
  //state'e ulaşmak için useAppSelector() 
  //methodlara ulaşmak için useAppDispatch() 

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true)


  const initApp = async () => {
   await dispatch(getUSer());
   await dispatch(getCart());
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [])


  if (loading) return <CircularProgress />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>

    </>
  )
}


export default App
