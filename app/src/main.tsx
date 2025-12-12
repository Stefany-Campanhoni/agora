import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import App from "./App.tsx"
import { WebsocketProvider } from "./components/websocket/WebsocketProvider.tsx"
import "./index.css"
import { persistor, store } from "./store"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <BrowserRouter>
          <WebsocketProvider>
            <App />
          </WebsocketProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
