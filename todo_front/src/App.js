import {Route,Routes,BrowserRouter} from "react-router-dom";
import RegisterPage from "./Component/Register/register";
import LoginPage from "./Component/Login/login";
import TodoTable from "./Component/Todo/todo";

function App() {
  return (
    <>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegisterPage/>}></Route>
      <Route path="/Login" element={<LoginPage/>}></Route>
      <Route path="/Todo" element={<TodoTable/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
