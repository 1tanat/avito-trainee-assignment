import { useState } from "react";

interface Props {
  images: string[];
  title: string;
}

export default function ItemGallery({ images, title }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const placeholderImage =
    "https://placehold.co/600x400/cccccc/969696?text=No+Image";

  const displayImages = images.length > 0 ? images : [placeholderImage];

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div
          className="mb-3"
          style={{
            height: "500px",
            overflow: "hidden",
            borderRadius: "8px",
            background: "#f5f5f5",
          }}
        >
          <img
            src={displayImages[selectedImage]}
            alt={title}
            className="w-100 h-100"
            style={{ objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>
        {displayImages.length > 1 && (
          <div className="d-flex gap-2 overflow-auto">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`border rounded ${index === selectedImage ? "border-primary border-3" : "border-secondary"}`}
                style={{
                  cursor: "pointer",
                  flexShrink: 0,
                  width: "100px",
                  height: "100px",
                  overflow: "hidden",
                }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderImage;
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
