import React, { useState } from 'react';
import './ItemModal.css';
import Button from '../Button/Button';

const ItemModal = ({ item, onClose, onDelete }) => {
    const [analyzeLoading, setAnalyzeLoading] = useState(false);

    const findAlternatives = () => {
        setAnalyzeLoading(true);
        // Simulating API call delay
        setTimeout(() => {
            setAnalyzeLoading(false);
        }, 1500);
    };

    return (
        <div className="modal-overlay">
            <div className="item-modal">
                <div className="modal-header">
                    <h2>товар</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-content">
                    <div className="modal-image">
                        <img src={item.image} alt={item.name} />
                    </div>

                    <div className="modal-details">
                        <h3>{item.name}</h3>
                        <p className="marketplace">маркетплейс</p>
                        <p className="price">{item.price}</p>

                        <div className="item-characteristics">
                            <p>цвет и прочее (характеристики или срок доставки)</p>
                        </div>

                        <div className="modal-actions">
                            <a
                                href="#"
                                className="marketplace-link-button"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ссылка на маркетплейс
                            </a>

                            <button
                                className={`analyze-button ${analyzeLoading ? 'loading' : ''}`}
                                onClick={findAlternatives}
                                disabled={analyzeLoading}
                            >
                                {analyzeLoading ? 'Поиск...' : 'Забронировать товар'}
                            </button>

                            <button className="delete-button" onClick={onDelete}>
                                Удалить товар
                            </button>
                        </div>
                    </div>
                </div>

                <div className="similar-products">
                    <h3>Аналоги на других площадках</h3>
                    <div className="alternatives-grid">
                        {[1, 2, 3].map(index => (
                            <div key={index} className="alternative-card">
                                <div className="alternative-image">
                                    <img src="/api/placeholder/150/150" alt={`Альтернатива ${index}`} />
                                </div>
                                <div className="alternative-details">
                                    <h4>Товар</h4>
                                    <p className="alternative-marketplace">маркетплейс</p>
                                    <p className="alternative-price">Цена</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;