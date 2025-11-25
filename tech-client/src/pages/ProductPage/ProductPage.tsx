import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAdById, fetchAds } from "../../api/ads";
import { approveAd, rejectAd, requestChangesAd } from "../../api/moderation";
import ItemGallery from "./components/ItemGallery.tsx";
import ProductInformation from "./components/ProductInformation.tsx";
import ModerationActions from "./components/ModerationActions.tsx";
import ModerationHistory from "./components/ModerationHistory.tsx";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adId = Number(id);

  const {
    data: ad,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ad", adId],
    queryFn: () => fetchAdById(adId),
  });

  const { data: adsData } = useQuery({
    queryKey: ["ads", "all"],
    queryFn: () => fetchAds({ limit: 1000 }),
  });

  const approveMutation = useMutation({
    mutationFn: approveAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad", adId] });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: { reason: string; comment?: string };
    }) => rejectAd(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad", adId] });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  const requestChangesMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: { reason: string; comment?: string };
    }) => requestChangesAd(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad", adId] });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  const getNextAdId = () => {
    if (!adsData?.ads) return null;
    const currentIndex = adsData.ads.findIndex((a) => a.id === adId);
    if (currentIndex < adsData.ads.length - 1) {
      return adsData.ads[currentIndex + 1].id;
    }
    return null;
  };

  const getPrevAdId = () => {
    if (!adsData?.ads) return null;
    const currentIndex = adsData.ads.findIndex((a) => a.id === adId);
    if (currentIndex > 0) {
      return adsData.ads[currentIndex - 1].id;
    }
    return null;
  };

  const handleApprove = () => {
    if (ad) {
      approveMutation.mutate(ad.id);
    }
  };

  const handleReject = (reason: string, comment?: string) => {
    if (ad) {
      rejectMutation.mutate({ id: ad.id, payload: { reason, comment } });
    }
  };

  const handleRequestChanges = (reason: string, comment?: string) => {
    if (ad) {
      requestChangesMutation.mutate({
        id: ad.id,
        payload: { reason, comment },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container my-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger" role="alert">
          Объявление не найдено
        </div>
      </div>
    );
  }

  const nextId = getNextAdId();
  const prevId = getPrevAdId();

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/list")}
        >
          ← Назад к списку
        </button>
        <div className="btn-group">
          {prevId && (
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(`/item/${prevId}`)}
            >
              ← Предыдущее
            </button>
          )}
          {nextId && (
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(`/item/${nextId}`)}
            >
              Следующее →
            </button>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <ItemGallery images={ad.images} title={ad.title} />
          <ProductInformation ad={ad} />
        </div>

        <div className="col-lg-4">
          <ModerationActions
            ad={ad}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestChanges={handleRequestChanges}
            isProcessing={
              approveMutation.isPending ||
              rejectMutation.isPending ||
              requestChangesMutation.isPending
            }
          />
          <ModerationHistory history={ad.moderationHistory} />
        </div>
      </div>
    </div>
  );
}
