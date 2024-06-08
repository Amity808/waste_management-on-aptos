import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import Layout from "../components/Layout";
import "@/styles/globals.css";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

const wallets = [new PetraWallet()];

function App({ Component, pageProps }) {
  return (
    <>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AptosWalletAdapterProvider>
    </>
  );
}

export default App;
