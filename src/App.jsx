import CustomSnackbar from './components/CustomSnackbar'
import RouteProvider from './routes/AppRouters'

function App() {
  return (
    <>
      <RouteProvider />
      <CustomSnackbar />
    </>
  )
}

export default App
