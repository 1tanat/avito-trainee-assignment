import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ActivityData } from "../../../api/stats";

interface Props {
  data: ActivityData[];
}

export default function ActivityChart({ data }: Props) {

  const chartData = data.map((item) => ({
    date: item.date,
    Одобрено: item.approved,
    Отклонено: item.rejected,
    "На доработке": item.requestChanges,
  }));

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Активность по дням</h5>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Одобрено" fill="#28a745" />
            <Bar dataKey="Отклонено" fill="#dc3545" />
            <Bar dataKey="На доработке" fill="#ffc107" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
