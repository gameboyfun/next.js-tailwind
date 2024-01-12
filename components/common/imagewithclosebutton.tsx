import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "@nextui-org/react";

const ImageWithCloseButton = ({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) => {
  return (
    <div className="h-[200px] w-[200px] relative border rounded-2xl bg-[#ddd]">
      <div
        className="rounded-full absolute z-50 top-1.5 right-1.5 h-6 w-6 flex justify-center items-center bg-danger text-white cursor-pointer"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <Image
        src={src}
        className="object-contain w-[200px] h-[200px]"
        // fallbackSrc="https://via.placeholder.com/200x200"
        fallbackSrc="https://hd.wallpaperswide.com/thumbs/amazing_asiatic_landscape_art-t2.jpg"
        alt={alt}
      />
    </div>
  );
};

export default ImageWithCloseButton;
