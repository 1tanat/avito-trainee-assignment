import { useNavigate } from "react-router-dom";
import type { Advertisement } from "../../../api/ads";

interface Props {
  ad: Advertisement;
}

export default function ProductCard({ ad }: Props) {
  const navigate = useNavigate();

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "На модерации",
      approved: "Одобрено",
      rejected: "Отклонено",
      draft: "На доработке",
    };
    return labels[status] || status;
  };

  const getStatusBadgeClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: "bg-warning text-dark",
      approved: "bg-success",
      rejected: "bg-danger",
      draft: "bg-info text-dark",
    };
    return classes[status] || "bg-secondary";
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/item/${ad.id}`)}
    >
      <div className="position-relative">
        <img
          src={ad.images[0] || "/placeholder.png"}
          className="card-img-top"
          alt={ad.title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/300x200/cccccc/969696?text=No+Image";
          }}
        />
        {ad.priority === "urgent" && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
            Срочно
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{ad.title}</h5>
        <div className="fs-4 fw-bold text-primary mb-2">{ad.price} ₽</div>
        <div className="d-flex justify-content-between text-muted small mb-2">
          <span>{ad.category}</span>
          <span>{ad.createdAt}</span>
        </div>
        <span className={`badge ${getStatusBadgeClass(ad.status)} mt-auto`}>
          {getStatusLabel(ad.status)}
        </span>
      </div>
    </div>
  );
}
