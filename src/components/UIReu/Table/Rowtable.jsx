import { useState, useEffect } from 'react';
import { Button } from '../Buton/Button';

export const Rowtable = ({
    isError,
    isPending,
    data,
    refetch,
    renderItem,
    ifEmpty,
    paddingError,
    totalCol,
    totalRow
    }) => {
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setShowEmptyMessage(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    if (isPending) {
        return null;
    }

    if (isError) {
        return (
        <TableRow>
            <div className={paddingError ? paddingError : 'py-5'}>
            <p>Gagal memuat data!</p>
            <Button className={'btn-primary text-white mt-1'} onClick={refetch}>Coba Lagi</Button>
            </div>
        </TableRow>
        )
    }

    if (showEmptyMessage && data?.length === 0) {
        return (
        <tr>
            <td colSpan={totalCol} className="text-center py-5 rounded-3 fs-2">{ifEmpty}</td>
        </tr>
        )
    }

    return (
        <>
        {/* {data?.map((data, index) => (
            renderItem(data, index)
        ))} */}

        {data?.map((data, index) => {
        return renderItem(data, index);
        })}
        </>
    )
}

const TableRow = ({ children }) => {
    return (
        <tr>
        <td colSpan={12} className="text-center">
            {children}
        </td>
        </tr>
    )
}