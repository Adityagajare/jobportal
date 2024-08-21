import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../services/service"

interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  appliedJobCount: number;
}

const Applications: React.FC = () => {
  const [rowData, setRowData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/appliedjobs/unique-applied-users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data, 'Fetched data');
        if (Array.isArray(data)) {
          setRowData(data);
        } else {
          throw new Error('Expected an array');
        }
      })
      .catch(error => {
        console.error('Error fetching unique applied users:', error);
        setError('Failed to fetch data');
      });
  }, []);

  const handleButtonClick = (userId: string) => {
    navigate(`/dashboard/user/joblist/${userId}`, { state: { userId } });
  };

  const buttonCellRenderer = (params: any) => {
    return (
      <button
        className="btn btn-primary"
        onClick={() => handleButtonClick(params.data.user_id)}
      >
        View
      </button>
    );
  };

  const serialNumberCellRenderer = (params: any) => {
    return params.node.rowIndex + 1;
  };

  const columnDefs: ColDef<User>[] = [
    { headerName: 'Sl No', valueGetter: serialNumberCellRenderer, width: 90 },
    // { headerName: 'ID', field: 'user_id', sortable: true, filter: true },
    { headerName: 'Name', field: 'user_name', sortable: true, filter: true },
    { headerName: 'Email', field: 'user_email', sortable: true, filter: true },
    { headerName: 'Applied Jobs Count', field: 'appliedJobCount', sortable: true, filter: true },
    { headerName: 'Actions', cellRenderer: buttonCellRenderer, width: 150 },
  ];

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact<User> rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default Applications;
