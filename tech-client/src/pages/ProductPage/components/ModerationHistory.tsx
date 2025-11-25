import type { ModerationHistory as ModerationHistoryType } from "../../../api/ads";

interface Props {
  history: ModerationHistoryType[];
}

export default function ModerationHistory({ history }: Props) {
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

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      approved: "Одобрено",
      rejected: "Отклонено",
      requestChanges: "Вернуто на доработку",
    };
    return labels[action] || action;
  };

  const getActionBadgeClass = (action: string) => {
    const classes: Record<string, string> = {
      approved: "bg-success",
      rejected: "bg-danger",
      requestChanges: "bg-warning text-dark",
    };
    return classes[action] || "bg-secondary";
  };

  if (history.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">История модерации</h5>
        </div>
        <div className="card-body text-center text-muted">
          История модерации отсутствует
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">История модерации</h5>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="list-group-item border-start border-4 border-primary mb-2"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className={`badge ${getActionBadgeClass(entry.action)}`}>
                  {getActionLabel(entry.action)}
                </span>
                <small className="text-muted">
                  {formatDate(entry.timestamp)}
                </small>
              </div>
              <div className="mb-1">
                <small className="text-muted">Модератор:</small>{" "}
                {entry.moderatorName}
              </div>
              {entry.reason && (
                <div className="mb-1">
                  <strong>Причина:</strong> {entry.reason}
                </div>
              )}
              {entry.comment && (
                <div>
                  <strong>Комментарий:</strong> {entry.comment}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
