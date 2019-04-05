import { useDropzone } from "react-dropzone";

export const usePaperDropzone = (setFiles, { multiple }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    noDrag: true,
    multiple,
    onDrop: setFiles
  });
  const { ref, ...rootProps } = getRootProps();
  return [{ ref, rootProps, getInputProps }];
};
