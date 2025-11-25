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

export function Sorter({ filters, onChange }: Props) {
  const handleSortByChange = (sortBy: "createdAt" | "price" | "priority") => {
    onChange({ ...filters, sortBy });
  };

  const handleSortOrderChange = (sortOrder: "asc" | "desc") => {
    onChange({ ...filters, sortOrder });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-auto">
            <label className="form-label mb-0 fw-bold">Сортировка:</label>
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              value={filters.sortBy}
              onChange={(e) =>
                handleSortByChange(
                  e.target.value as "createdAt" | "price" | "priority",
                )
              }
            >
              <option value="createdAt">По дате создания</option>
              <option value="price">По цене</option>
              <option value="priority">По приоритету</option>
            </select>
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              value={filters.sortOrder}
              onChange={(e) =>
                handleSortOrderChange(e.target.value as "asc" | "desc")
              }
            >
              <option value="desc">По убыванию</option>
              <option value="asc">По возрастанию</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
