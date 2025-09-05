import '../styles/main.css';
import '../styles/index.css';
import { Header, Home, Footer } from './Main';

export const Common: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <body>
      <Header />
      {children}
      <Footer />
    </body>
  )
}
export const App: React.FC = () => {
  return (
    <Common>
      <Home />
    </Common>
  )
}