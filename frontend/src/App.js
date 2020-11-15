import './styles/App.css';
import Main from "../src/components/Main";
import starlinkLogo from './images/starlink_logo.svg';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;


function App() {
  return (
    <Layout>     
      <Header>
        {/* / <img src={starlinkLogo} className="App-logo" alt="logo" /> */}
        <p className="title" >
             Travel Planner          
        </p>
      </Header>
      <Content>   
        <Main />       
      </Content>
      <Footer>
      (c) 2020 Travel Planner
      </Footer>
      </Layout>
  );
}

export default App;