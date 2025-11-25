import { useState } from "react";
import type { Advertisement } from "../../../api/ads";

const REJECTION_REASONS = [
  "Запрещенный товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

interface Props {
  ad: Advertisement;
  onApprove: () => void;
  onReject: (reason: string, comment?: string) => void;
  onRequestChanges: (reason: string, comment?: string) => void;
  isProcessing: boolean;
}

export default function ModerationActions({
  ad,
  onApprove,
  onReject,
  onRequestChanges,
  isProcessing,
}: Props) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");

  const handleReject = () => {
    const reason = selectedReason === "Другое" ? customReason : selectedReason;
    if (reason) {
      onReject(reason, comment || undefined);
      setShowRejectModal(false);
      setSelectedReason("");
      setCustomReason("");
      setComment("");
    }
  };

  const handleRequestChanges = () => {
    const reason = selectedReason === "Другое" ? customReason : selectedReason;
    if (reason) {
      onRequestChanges(reason, comment || undefined);
      setShowRequestChangesModal(false);
      setSelectedReason("");
      setCustomReason("");
      setComment("");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Действия модератора</h5>
      </div>
      <div className="card-body">
        <div className="d-grid gap-2">
          <button
            className="btn btn-success"
            onClick={onApprove}
            disabled={isProcessing || ad.status === "approved"}
          >
            Одобрить
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowRejectModal(true)}
            disabled={isProcessing || ad.status === "rejected"}
          >
            Отклонить
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowRequestChangesModal(true)}
            disabled={isProcessing || ad.status === "draft"}
          >
            Вернуть на доработку
          </button>
        </div>
      </div>

      {showRejectModal && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setShowRejectModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Отклонить объявление</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRejectModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Причина отклонения *</label>
                  <select
                    className="form-select"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  >
                    <option value="">Выберите причину</option>
                    {REJECTION_REASONS.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedReason === "Другое" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Укажите причину"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Дополнительный комментарий"
                    rows={4}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowRejectModal(false);
                    setSelectedReason("");
                    setCustomReason("");
                    setComment("");
                  }}
                >
                  Отмена
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleReject}
                  disabled={
                    !selectedReason ||
                    (selectedReason === "Другое" && !customReason)
                  }
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRequestChangesModal && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setShowRequestChangesModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Вернуть на доработку</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRequestChangesModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Причина *</label>
                  <select
                    className="form-select"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  >
                    <option value="">Выберите причину</option>
                    {REJECTION_REASONS.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedReason === "Другое" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Укажите причину"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Дополнительный комментарий"
                    rows={4}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowRequestChangesModal(false);
                    setSelectedReason("");
                    setCustomReason("");
                    setComment("");
                  }}
                >
                  Отмена
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleRequestChanges}
                  disabled={
                    !selectedReason ||
                    (selectedReason === "Другое" && !customReason)
                  }
                >
                  Вернуть на доработку
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
