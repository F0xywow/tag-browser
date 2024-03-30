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
  const [error] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

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
      const validLimit = Math.max(1, Math.min(limit, 100));
      const validPage = Math.max(1, page);
      console.log('Valid Page:', validPage);
      console.log('Valid Limit:', validLimit);
      let fetchedTags = [];
      let hasMore = true;

      while (hasMore) {
        try {
          const response = await axios.get(
            `https://api.stackexchange.com/2.3/tags?page=${validPage}&pagesize=${validLimit}&order=desc&sort=popular&site=stackoverflow`
          );
          fetchedTags = [...fetchedTags, ...response.data.items];
          hasMore = response.data.has_more;
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
          fetchedTags = [
            { name: 'javascript', count: 100 },
            { name: 'python', count: 80 },
            { name: 'java', count: 75 },
            { name: 'html', count: 70 },
            { name: 'css', count: 65 },
            { name: 'reactjs', count: 60 },
            { name: 'node.js', count: 55 },
            { name: 'sql', count: 50 },
            { name: 'typescript', count: 45 },
            { name: 'angular', count: 40 },
            { name: 'php', count: 35 },
            { name: 'c++', count: 30 },
            { name: 'c#', count: 25 },
            { name: 'ruby', count: 20 },
            { name: 'swift', count: 15 },
            { name: 'go', count: 10 },
            { name: 'rust', count: 5 },
            // Add more mock tags as needed
          ];
          break;
        }
      }

      setTags(fetchedTags);
      setLoading(false);
    };

    fetchData();
  }, [limit, page]);

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
      <Pagination count={Math.ceil(tags.length / limit)} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default App;