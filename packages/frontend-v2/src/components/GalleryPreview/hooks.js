export const useGalleryPreview = ({ thumbnail }) => ({
  getGalleryPreviewProps: () => ({
    className: "ds-gallery-preview",
    style: {
      background: `url(${thumbnail}) no-repeat center center / cover`
    }
  })
});
