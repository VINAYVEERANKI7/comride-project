import "./App.css";
import Index from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { socket } from "./redux/config";

function App() {
  useEffect(() => {
    const adminId = localStorage.getItem("id");
    const connectData = {
      userId: adminId,
    };
    if (adminId) {
      socket.emit("connected", connectData);
      socket.on("connected_success", (data) => {
        console.log(data, "connected_success");
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
