import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStatsSummary,
  fetchActivityChart,
  fetchDecisionsChart,
  fetchCategoriesChart,
} from "../../api/stats";
import StatsSummary from "./components/StatsSummary";
import ActivityChart from "./components/ActivityChart";
import DecisionsChart from "./components/DecisionsChart";
import CategoriesChart from "./components/CategoriesChart";

export default function StatsPage() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("week");

  const { data: summary, isLoading: summaryLoading, error: summaryError} = useQuery({
    queryKey: ["stats", "summary", period],
    queryFn: () => fetchStatsSummary({ period }),
  });

  const { data: activityData, isLoading: activityLoading, error: activityError} = useQuery({
    queryKey: ["stats", "activity", period],
    queryFn: () => fetchActivityChart({ period }),
  });

  const { data: decisionsData, isLoading: decisionsLoading, error: decisionsError} = useQuery({
    queryKey: ["stats", "decisions", period],
    queryFn: () => fetchDecisionsChart({ period }),
  });

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError, } = useQuery({
    queryKey: ["stats", "categories", period],
    queryFn: () => fetchCategoriesChart({ period }),
  });

  const isLoading = Boolean(summaryLoading || activityLoading || decisionsLoading || categoriesLoading);
  const hasError = Boolean(summaryError || activityError || decisionsError || categoriesError);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Статистика модератора</h1>

      <div className="card mb-4">
        <div className="card-body">
          <div className="btn-group" role="group">

            <button
              type="button"
              className={`btn ${period === "today" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPeriod("today")}
            >
              Сегодня
            </button>

            <button
              type="button"
              className={`btn ${period === "week" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPeriod("week")}
            >
              Последние 7 дней
            </button>

            <button
              type="button"
              className={`btn ${period === "month" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPeriod("month")}
            >
              Последние 30 дней
            </button>
            
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка статистики...</span>
          </div>
        </div>
      ) : hasError ? (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Ошибка загрузки статистики</h4>
          <p className="mb-0">
            Убедитесь, что сервер запущен на http://localhost:3001
          </p>
        </div>
      ) : summary && activityData && decisionsData && categoriesData ? (
        <>
          <StatsSummary summary={summary} period={period} />

          <div className="row g-4 mt-2">
            <div className="col-lg-6">
              <ActivityChart data={activityData} />
            </div>
            <div className="col-lg-6">
              <DecisionsChart data={decisionsData} />
            </div>
            <div className="col-12">
              <CategoriesChart data={categoriesData} />
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-info">Нет данных для отображения</div>
      )}
    </div>
  );
}
