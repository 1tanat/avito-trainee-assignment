import type { StatsSummary as StatsSummaryType } from "../../../api/stats";

interface Props {
  summary: StatsSummaryType;
  period: "today" | "week" | "month";
}

export default function StatsSummary({ summary, period }: Props) {
  const getTotalReviewed = () => {
    switch (period) {
      case "today":
        return summary.totalReviewedToday;
      case "week":
        return summary.totalReviewedThisWeek;
      case "month":
        return summary.totalReviewedThisMonth;
      default:
        return summary.totalReviewed;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}м ${secs}с`;
  };

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4 col-sm-6">
        <div className="card text-center">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Проверено объявлений
            </h6>
            <h3 className="card-title">{getTotalReviewed()}</h3>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="card text-center">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Процент одобренных
            </h6>
            <h3 className="card-title text-success">
              {summary.approvedPercentage.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="card text-center">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Процент отклоненных
            </h6>
            <h3 className="card-title text-danger">
              {summary.rejectedPercentage.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="card text-center">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">На доработке</h6>
            <h3 className="card-title text-warning">
              {summary.requestChangesPercentage.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="card text-center">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Среднее время проверки
            </h6>
            <h3 className="card-title">
              {formatTime(summary.averageReviewTime)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
