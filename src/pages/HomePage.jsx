import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as XLSX from 'xlsx';
import "../assets/css/index.css"

function HomePage() {
  const [rowData, setRowData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [phoneSearchTerm, setPhoneSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('email');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/database/db.xlsx');
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (event) => {
          const binaryString = event.target.result;
          const workbook = XLSX.read(binaryString, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const headers = jsonData[0];
          const rows = jsonData.slice(1);

          const formattedData = rows.map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index];
            });
            return rowData;
          });

          setRowData(formattedData);
          setFilteredData(formattedData);
        };

        reader.readAsBinaryString(blob);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = [];
    if (activeSearch === 'email') {
      filteredData = rowData.filter(row => {
        const columnValue = row['Correo '];
        return typeof columnValue === 'string' && columnValue.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else if (activeSearch === 'phone') {
      filteredData = rowData.filter(row => {
        const columnValue = row['Teléfono Contacto  '];
        return typeof columnValue === 'number' && columnValue.toString().includes(phoneSearchTerm);
      });
    }
    setFilteredData(filteredData);
  }, [rowData, searchTerm, phoneSearchTerm, activeSearch]);

  const handlePhoneSearchChange = (e) => {
    setActiveSearch('phone');
    setSearchTerm(''); 
    const value = parseInt(e.target.value);
    setPhoneSearchTerm(value);
  };

  const handleEmailSearchChange = (e) => {
    setActiveSearch('email');
    setPhoneSearchTerm('');
    setSearchTerm(e.target.value);
  };

  const columnDefs = rowData.length > 0 ? Object.keys(rowData[0]).map((key) => ({
    headerName: key,
    field: key
  })) : [];

  return (
    <div>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="ejemplo@gmail.com" aria-label="Correo electrónico" aria-describedby="basic-addon1" value={activeSearch === 'email' ? searchTerm : ''} onChange={handleEmailSearchChange} />
        <span className="input-group-text" id="basic-addon2">Find Email</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Find Phone</span>
        <input type="number" className="form-control" placeholder="951xxxxxxxxx" aria-label="Número de teléfono" aria-describedby="basic-addon1" id="phone" value={activeSearch === 'phone' ? phoneSearchTerm : ''} onChange={handlePhoneSearchChange} />
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          pagination={true}
        />
      </div>
      br

    </div>
  );
}

export default HomePage;
