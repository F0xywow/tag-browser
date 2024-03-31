import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TagTable from './TagTable';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const [tags, setTags] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const sortedTags = [...tags].sort((a, b) => {
  if (sortField === 'name') {
    return sortDirection === 'asc'
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  } else if (sortField === 'count') {
    return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
  } else {
    return 0;
  }
});

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedTags = sortedTags.slice((page - 1) * limit, page * limit);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow`
      );
      setTags(response.data.items);
      setLoading(false);

      const totalPages = Math.ceil(response.data.items.length / limit);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  fetchData();
}, [limit]); 


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <TextField label="Limit" type="number" value={limit} onChange={handleLimitChange} />
      <TagTable tags={paginatedTags} onSort={handleSort} />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default App;