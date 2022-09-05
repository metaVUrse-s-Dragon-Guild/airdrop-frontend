import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import WalletModal from "./components/WalletModal/WalletModal";
import Routes from "./routes/Routes";
import { Notifications } from './components';
import { loadEthPrice, loadGmtTime, unconnectedDataLoad } from "./store/actions/userActions";

function App({unconnectedDataLoad, loadEthPrice, walletModal, loadGmtTime}) {
  useEffect(() => {
    unconnectedDataLoad()
    loadEthPrice()
    loadGmtTime()
  }, [unconnectedDataLoad, loadEthPrice, loadGmtTime])
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Routes />
        {walletModal && <WalletModal />}
        <Notifications
        position={'top-right'}
        autoDelete={true}
        autoDeleteTime={2000}
      />
      </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    walletModal: state.ui.walletModal,
  }
}

export default connect(mapStateToProps, { unconnectedDataLoad, loadEthPrice, loadGmtTime })(App);

