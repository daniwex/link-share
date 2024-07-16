import Navbar from "../component/Navbar";
export default function layout({ children }) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  );
}
