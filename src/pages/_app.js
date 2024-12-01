import  {AuthProvider} from "../../context/auth.js"
import '../../styles/global.css';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Component {...pageProps}/>
    </AuthProvider>
  )

}

export default App;
