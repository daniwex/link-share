import Navbar from "../component/Navbar";

export default function layout({ children, data }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
