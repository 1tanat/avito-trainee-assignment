import type { Advertisement } from "../../../api/ads";

interface Props {
  ad: Advertisement;
}

export default function ProductInformation({ ad }: Props) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
    <div className="card mb-4">
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h1 className="h3 mb-2">{ad.title}</h1>
          <div className="h4 text-primary fw-bold">
            {formatPrice(ad.price)} ₽
          </div>
        </div>

        <div className="row g-3 mb-3 pb-3 border-bottom">
          <div className="col-md-6">
            <small className="text-muted text-uppercase fw-bold">
              Категория
            </small>
            <div>{ad.category}</div>
          </div>
          <div className="col-md-6">
            <small className="text-muted text-uppercase fw-bold">Статус</small>
            <div>
              <span className={`badge ${getStatusBadgeClass(ad.status)}`}>
                {getStatusLabel(ad.status)}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <small className="text-muted text-uppercase fw-bold">
              Приоритет
            </small>
            <div>
              <span
                className={`badge ${ad.priority === "urgent" ? "bg-danger" : "bg-secondary"}`}
              >
                {ad.priority === "urgent" ? "Срочный" : "Обычный"}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <small className="text-muted text-uppercase fw-bold">Создано</small>
            <div>{formatDate(ad.createdAt)}</div>
          </div>
          <div className="col-md-6">
            <small className="text-muted text-uppercase fw-bold">
              Обновлено
            </small>
            <div>{formatDate(ad.updatedAt)}</div>
          </div>
        </div>

        <div className="mb-3 pb-3 border-bottom">
          <h5 className="mb-2">Описание</h5>
          <p className="text-muted">{ad.description}</p>
        </div>

        <div className="mb-3 pb-3 border-bottom">
          <h5 className="mb-3">Характеристики</h5>
          <table className="table table-bordered">
            <tbody>
              {Object.entries(ad.characteristics).map(([key, value]) => (
                <tr key={key}>
                  <td className="fw-bold">{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h5 className="mb-3">Информация о продавце</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-muted text-uppercase fw-bold">Имя</small>
              <div>{ad.seller.name}</div>
            </div>
            <div className="col-md-6">
              <small className="text-muted text-uppercase fw-bold">
                Рейтинг
              </small>
              <div>{ad.seller.rating}</div>
            </div>
            <div className="col-md-6">
              <small className="text-muted text-uppercase fw-bold">
                Объявлений
              </small>
              <div>{ad.seller.totalAds}</div>
            </div>
            <div className="col-md-6">
              <small className="text-muted text-uppercase fw-bold">
                Дата регистрации
              </small>
              <div>{formatDateShort(ad.seller.registeredAt)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
