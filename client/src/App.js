import Header from "./components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Projects } from "./pages/Projects";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>        
          <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<NotFound />}/>
                <Route path="projects/:id" element={<Projects />}/>
              </Routes>
            </div>
        </Router>
      </ApolloProvider>
    </>

  );
}

export default App;
