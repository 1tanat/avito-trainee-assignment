import { useState } from "react";

const CATEGORIES = [
  { id: 0, name: "Электроника" },
  { id: 1, name: "Недвижимость" },
  { id: 2, name: "Транспорт" },
  { id: 3, name: "Работа" },
  { id: 4, name: "Услуги" },
  { id: 5, name: "Животные" },
  { id: 6, name: "Мода" },
  { id: 7, name: "Детское" },
];

const STATUS_OPTIONS = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "draft", label: "На доработке" },
];

interface Filters {
  status: string[];
  categoryId: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  search: string;
  sortBy: "createdAt" | "price" | "priority";
  sortOrder: "asc" | "desc";
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function FilterPanel({ filters, onChange }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onChange({ ...filters, status: newStatus });
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    onChange({ ...filters, categoryId });
  };

  const handlePriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    onChange({ ...filters, [field]: numValue });
  };

  const handleSearchChange = (value: string) => {
    onChange({ ...filters, search: value });
  };

  const resetFilters = () => {
    onChange({
      status: [],
      categoryId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.categoryId !== undefined ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.search !== "";

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Фильтры</h5>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Свернуть" : "Развернуть"}
        </button>
      </div>
      
      <div className="card-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по названию или описанию..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {isExpanded && (
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Статус</label>
              <div className="d-flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <div key={option.value} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`status-${option.value}`}
                      checked={filters.status.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`status-${option.value}`}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Категория</label>
              <select
                className="form-select"
                value={filters.categoryId ?? ""}
                onChange={(e) =>
                  handleCategoryChange(
                    e.target.value === "" ? undefined : Number(e.target.value),
                  )
                }
              >
                <option value="">Все категории</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Цена</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="От"
                  value={filters.minPrice ?? ""}
                  onChange={(e) =>
                    handlePriceChange("minPrice", e.target.value)
                  }
                />
                <span className="input-group-text">-</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="До"
                  value={filters.maxPrice ?? ""}
                  onChange={(e) =>
                    handlePriceChange("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <button className="btn btn-danger mt-3" onClick={resetFilters}>
            Сбросить фильтры
          </button>
        )}
      </div>
    </div>
  );
}
