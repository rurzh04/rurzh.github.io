import React, { useState, useEffect } from 'react';
import { useGetContactQuery } from '../../api/apiContact';
import Spinner from '../../components/spinner/spinner';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import './style.scss';

type Props = {};

const Dashboard = (props: Props) => {
    const { data = [], error, isLoading } = useGetContactQuery();
    const [dataNew, setDataNew] = useState(data);
    const [searchText, setSearchText] = useState('');

    const [id, setID] = useState(false);
    const [firstName, setFirstName] = useState(false);
    const [lastName, setLastName] = useState(false);
    const [email, setEmail] = useState(false);
    const [phone, setPhone] = useState(false);

    const itemsPerPage = 50;
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = dataNew.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = dataNew.slice(startIndex, endIndex);

    const thData = [
        { span: 'ID', onClick: 'id', click: id },
        { span: 'First Name', onClick: 'firstName', click: firstName },
        { span: 'Last Name', onClick: 'lastName', click: lastName },
        { span: 'Email', onClick: 'email', click: email },
        { span: 'Phone', onClick: 'phone', click: phone },
    ];

    const quickSortID = (arr) => {
        if (arr.length <= 1) {
            return arr;
        }
        const pivotIndex = Math.floor(arr.length / 2);
        const pivot = arr[pivotIndex];
        const left = [];
        const equal = [];
        const right = [];
        for (let i = 0; i < arr.length; i++) {
            if (i === pivotIndex) {
                equal.push(arr[i]);
            } else if (arr[i]._id < pivot._id) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSortID(left).concat(equal, quickSortID(right));
    };

    const quickSortPhone = (arr) => {
        if (arr.length <= 1) {
            return arr;
        }
        const pivotIndex = Math.floor(arr.length / 2);
        const pivot = arr[pivotIndex];
        const left = [];
        const equal = [];
        const right = [];
        for (let i = 0; i < arr.length; i++) {
            if (i === pivotIndex) {
                equal.push(arr[i]);
            } else if (arr[i].phone < pivot.phone) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSortPhone(left).concat(equal, quickSortPhone(right));
    };

    const sortFirstName = (items) => {
        const sortedData = [...items].sort((a, b) => {
            const firstNameA = a.firstName?.charAt(0).toLowerCase();
            const firstNameB = b.firstName?.charAt(0).toLowerCase();
            return firstNameA.localeCompare(firstNameB);
        });
        return sortedData;
    };

    const sortLastName = (items) => {
        const sortedData = [...items].sort((a, b) => {
            const lastNameA = a.lastName?.charAt(0).toLowerCase();
            const lastNameB = b.lastName?.charAt(0).toLowerCase();
            return lastNameA.localeCompare(lastNameB);
        });
        return sortedData;
    };

    const sortEmail = (items) => {
        const sortedData = [...items].sort((a, b) => {
            const emailA = a.email?.charAt(0).toLowerCase();
            const emailB = b.email?.charAt(0).toLowerCase();
            return emailA.localeCompare(emailB);
        });
        return sortedData;
    };

    const handleClick = (field) => {
        switch (field) {
            case 'id':
                setID(!id);
                setDataNew(id ? dataNew.reverse() : quickSortID(dataNew));
                break;
            case 'phone':
                setPhone(!phone);
                setDataNew(phone ? dataNew.reverse() : quickSortPhone(dataNew));
                break;
            case 'firstName':
                setFirstName(!firstName);
                setDataNew(
                    firstName ? dataNew.reverse() : sortFirstName(dataNew)
                );
                break;
            case 'lastName':
                setLastName(!lastName);
                setDataNew(
                    lastName ? dataNew.reverse() : sortLastName(dataNew)
                );
                break;
            case 'email':
                setEmail(!email);
                setDataNew(email ? dataNew.reverse() : sortEmail(dataNew));
                break;
            default:
                break;
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        const filteredData = data.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setDataNew(filteredData.length === 0 ? [] : filteredData);
    };

    useEffect(() => {
        setDataNew(data);
    }, [data]);

    return (
        <div className="table-container">
            <div className="table__search">
                <input
                    type="text"
                    className="table__input"
                    value={searchText}
                    onChange={handleChange}
                />
                <button className="table__button" onClick={handleSearch}>
                    Найти
                </button>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        {thData.map((item) => (
                            <th key={item.span}>
                                <div className="th_block">
                                    <span>{item.span}</span>
                                    <button
                                        className="button"
                                        onClick={() =>
                                            handleClick(item.onClick)
                                        }
                                    >
                                        {item.click ? (
                                            <AiOutlineArrowDown className="button_icon" />
                                        ) : (
                                            <AiOutlineArrowUp className="button_icon" />
                                        )}
                                    </button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, i) => (
                        <tr key={i}>
                            <td className="table-cell">{item._id}</td>
                            <td className="table-cell">{item.firstName}</td>
                            <td className="table-cell">{item.lastName}</td>
                            <td className="table-cell">{item.email}</td>
                            <td className="table-cell">{item.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalItems > itemsPerPage && (
                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Предыдущая страница
                    </button>
                    <button
                        disabled={endIndex >= totalItems}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Следующая страница
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
