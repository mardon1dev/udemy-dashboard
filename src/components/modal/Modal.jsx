import Button from "../Button";

const Modal = ({ children, title, modalheader, open, setOpen }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{modalheader}</p>
        <Button
          addStyle="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute top-2 right-2"
          type={"button"}
          title={"X"}
          onClick={() => {
            setOpen(false);
          }}
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
