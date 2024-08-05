import { User } from '@/types/User';
import { useState, useEffect, useCallback } from 'react';

const useFetchUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPageUrls = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://gist.githubusercontent.com/dsandin/c8ed6c5a9486f311f4725f221b912220/raw/8c6d2d8e1f339d02e0ff3d2990560a4862c4beae/users_page_list'
      );
      const { pages } = await response.json();
      setPageUrls(pages);
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPageData = useCallback(async () => {
    if (currentPage >= pageUrls.length) return;

    setIsLoading(true);

    try {
      const response = await fetch(pageUrls[currentPage]);
      const pageData = await response.json();
      setData((prevData) => [...prevData, ...pageData]);
      setCurrentPage((prevPage) => prevPage + 1);
      //   setHasMore(currentPage + 1 < pageUrls.length);
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [pageUrls, currentPage]);

  useEffect(() => {
    fetchPageUrls();
  }, []);

  useEffect(() => {
    if (pageUrls.length > 0) {
      fetchPageData();
    }
  }, [pageUrls]);

  return {
    data,
    isLoading,
    error,
    hasMore,
    fetchPageData,
  };
};

export default useFetchUsers;
