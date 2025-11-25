import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { DecisionsData } from "../../../api/stats";

interface Props {
  data: DecisionsData;
}

const COLORS = ["#28a745", "#dc3545", "#ffc107"];

export default function DecisionsChart({ data }: Props) {
  const chartData = [
    { name: "Одобрено", value: data.approved },
    { name: "Отклонено", value: data.rejected },
    { name: "На доработке", value: data.requestChanges },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Распределение решений</h5>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${((percent || 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
