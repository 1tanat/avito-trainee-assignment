import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAds } from "../../api/ads";
import type { Advertisement } from "../../api/ads";
import ProductCard from "./components/ProductCard";
import { FilterPanel } from "./components/FilterPanel";
import { Pagination } from "./components/Pagination";
import { Sorter } from "./components/Sorter";

export default function MainPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<{
    status: string[];
    categoryId: number | undefined;
    minPrice: number | undefined;
    maxPrice: number | undefined;
    search: string;
    sortBy: "createdAt" | "price" | "priority";
    sortOrder: "asc" | "desc";
  }>({
    status: [],
    categoryId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["ads", page, filters],
    queryFn: () => fetchAds({ page, limit: 10, ...filters }),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className="container my-4">
      <h1 className="mb-4">Список объявлений</h1>

      <FilterPanel filters={filters} onChange={handleFiltersChange} />
      <Sorter filters={filters} onChange={handleFiltersChange} />

      {isLoading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Ошибка загрузки объявлений</h4>
          <p>Убедитесь, что сервер запущен на http://localhost:3001</p>
          <p className="mb-0">
            {error instanceof Error ? error.message : "Неизвестная ошибка"}
          </p>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          {data.ads.length === 0 ? (
            <div className="alert alert-info" role="alert">
              Объявления не найдены
            </div>
          ) : (
            <div className="row g-4 mb-4">
              {data.ads.map((ad: Advertisement) => (
                <div key={ad.id} className="col-md-6 col-lg-4 col-xl-3">
                  <ProductCard ad={ad} />
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            totalItems={data.pagination.totalItems}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
