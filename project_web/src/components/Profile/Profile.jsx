import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemModal from './ItemModal';
import Button from '../Button/Button';
import './Profile.css';

const Profile = () => {
    const [lists, setLists] = useState([
        {
            id: 1,
            name: "День рождения",
            itemCount: 3,
            items: [
                {
                    id: 1,
                    name: "Товар 1",
                    marketplace: "маркетплейс",
                    price: "5000 ₽",
                    image: "/api/placeholder/400/320"
                },
                {
                    id: 2,
                    name: "Товар 2",
                    marketplace: "маркетплейс",
                    price: "3500 ₽",
                    image: "/api/placeholder/400/320"
                },
                {
                    id: 3,
                    name: "Товар 3",
                    marketplace: "маркетплейс",
                    price: "7800 ₽",
                    image: "/api/placeholder/400/320"
                }
            ]
        },
        {
            id: 2,
            name: "Новый год",
            itemCount: 2,
            items: [
                {
                    id: 4,
                    name: "Товар 4",
                    marketplace: "маркетплейс",
                    price: "2500 ₽",
                    image: "/api/placeholder/400/320"
                },
                {
                    id: 5,
                    name: "Товар 5",
                    marketplace: "маркетплейс",
                    price: "10000 ₽",
                    image: "/api/placeholder/400/320"
                }
            ]
        }
    ]);

    const [activeListId, setActiveListId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Find the active list
    const activeList = lists.find(list => list.id === activeListId) || lists[0];

    // Function to create a new list
    const createNewList = () => {
        const newList = {
            id: Date.now(),
            name: `Новый список ${lists.length + 1}`,
            itemCount: 0,
            items: []
        };
        setLists([...lists, newList]);
        setActiveListId(newList.id);
    };

    // Function to delete a list
    const deleteList = (listId) => {
        const updatedLists = lists.filter(list => list.id !== listId);
        setLists(updatedLists);
        if (activeListId === listId && updatedLists.length > 0) {
            setActiveListId(updatedLists[0].id);
        }
    };

    // Function to add a new item to the active list
    const addNewItem = () => {
        const newItem = {
            id: Date.now(),
            name: "Новый товар",
            marketplace: "маркетплейс",
            price: "0 ₽",
            image: "/api/placeholder/400/320"
        };

        const updatedLists = lists.map(list => {
            if (list.id === activeListId) {
                return {
                    ...list,
                    items: [...list.items, newItem],
                    itemCount: list.itemCount + 1
                };
            }
            return list;
        });

        setLists(updatedLists);
    };

    // Function to delete an item
    const deleteItem = (itemId) => {
        const updatedLists = lists.map(list => {
            if (list.id === activeListId) {
                const filteredItems = list.items.filter(item => item.id !== itemId);
                return {
                    ...list,
                    items: filteredItems,
                    itemCount: filteredItems.length
                };
            }
            return list;
        });

        setLists(updatedLists);
        setShowModal(false);
    };

    // Open modal with item details
    const openItemModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="profile-avatar"></div>
                    <div className="profile-details">
                        <h2>Мой профиль</h2>
                        <p className="profile-stat">Кол-во списков: {lists.length}</p>
                    </div>
                </div>
                <div className="profile-actions">
                    <Button>Мои списки желаний</Button>
                </div>
            </div>

            <div className="lists-section">
                <div className="lists-header">
                    {lists.map(list => (
                        <div
                            key={list.id}
                            className={`list-tab ${activeListId === list.id ? 'active' : ''}`}
                            onClick={() => setActiveListId(list.id)}
                        >
                            <h3>{list.name}</h3>
                            <p>кол-во товаров в списке: {list.itemCount}</p>
                            {activeListId === list.id && (
                                <button onClick={() => deleteList(list.id)} className="delete-list-btn">
                                    Удалить список
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="list-tab new-list" onClick={createNewList}>
                        <button className="add-list-btn">+ Создать новый список</button>
                    </div>
                </div>

                <div className="list-content">
                    <div className="list-actions">
                        <Button onClick={addNewItem}>Добавить товар</Button>
                    </div>

                    {activeList && activeList.items.length > 0 ? (
                        <div className="items-grid">
                            {activeList.items.map(item => (
                                <div key={item.id} className="item-card" onClick={() => openItemModal(item)}>
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p className="item-marketplace">{item.marketplace}</p>
                                        <p className="item-price">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-list">
                            <p>В этом списке пока нет товаров</p>
                            <Button onClick={addNewItem}>Добавить товар</Button>
                        </div>
                    )}
                </div>
            </div>

            {showModal && selectedItem && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onDelete={() => deleteItem(selectedItem.id)}
                />
            )}
        </div>
    );
};

export default Profile;