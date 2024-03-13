import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [newData, setNewData] = useState([]);



    console.log(newData, 'newData');
    return (
        <DataContext.Provider value={{ newData, setNewData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);