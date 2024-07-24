export default function Notify({ message, img, close, position, width, justifyContent }) {
  return (
    <div className="text-white p-2 text-xs w-60 rounded absolute top-[65px] pop-up flex justify-between sm:top-[calc(90%)] sm:w-fit" style={{top:position, width, justifyContent}}>
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
