import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";
import ReactDOMServer from "react-dom/server";

const SwalModal = ({
  title,
  icon,
  showCancelButton = false,
  confirmButtonText = "ตกลง",
  cancelButtonText = "ยกเลิก",
  text = "",
  onConfirm = () => {},
}) => {
  const confirmElement = (
    <Button color="primary" className="mx-2">
      {confirmButtonText}
    </Button>
  );
  const confirmHtml = ReactDOMServer.renderToString(confirmElement);

  const cancelElement = (
    <Button color="danger" className="mx-2">
      {cancelButtonText}
    </Button>
  );
  const cancelHtml = ReactDOMServer.renderToString(cancelElement);

  const mixinOptions = {
    buttonsStyling: false,
    confirmButtonText: confirmHtml,
    cancelButtonText: cancelHtml,
    allowOutsideClick: false
  };

  // Use a callback function to execute the mixin when needed
  const fireSwal = () => {
    const mixin = Swal.mixin(mixinOptions);

    mixin
      .fire({
        title: title,
        icon: icon,
        showCancelButton: showCancelButton,
        text: text,
      })
      .then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm(); // Execute the onConfirm callback
        }
      });
  };

  return fireSwal;
};

export default SwalModal;
