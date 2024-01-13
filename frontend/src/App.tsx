import { RouterProvider } from "react-router-dom"
import router from "./router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store'
import { Provider } from 'react-redux'

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
