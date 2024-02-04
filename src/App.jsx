import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { CartContextProvider } from "./store/cartContext";
function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <>
          <Header />
          <Meals />
          <Cart />
        </>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
