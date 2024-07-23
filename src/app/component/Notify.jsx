export default function Notify({ message, img, close }) {
  return (
    <div className="text-white p-3 text-sm rounded absolute bottom-12 pop-up flex">
      <div>
        <span>{img}</span>
        <span>{message}</span>
      </div>
      <button className="ml-5" onClick={close}>
        &times;
      </button>
    </div>
  );
}
