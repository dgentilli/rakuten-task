import { User } from '@/types/User';
import { useState, useEffect, useCallback } from 'react';

const useFetchUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState('');
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchPageUrls = useCallback(async () => {
    // Responsible for: fetching the urls and returning the array of urls
    // chose to return the urls instead of setting state here to keep things in sync
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://gist.githubusercontent.com/dsandin/c8ed6c5a9486f311f4725f221b912220/raw/8c6d2d8e1f339d02e0ff3d2990560a4862c4beae/users_page_list'
      );
      const { pages } = await response.json();
      return pages;
    } catch (error) {
      console.error(error);
      setError('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPageData = useCallback(async () => {
    // Responsible for: Fetching the page data. Checks to make sure we aren't already loading
    // and makes sure we don't try to load a page that doesn't exist.
    if (currentPage >= pageUrls.length) return;
    if (isFetchingData) return;

    try {
      setIsFetchingData(true);
      const response = await fetch(pageUrls[currentPage]);
      const pageData = await response.json();

      setData((prevData) => [...prevData, ...pageData]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
      setError('Something went wrong.');
    } finally {
      setIsFetchingData(false);
    }
  }, [pageUrls, currentPage, isFetchingData]);

  const fetchFirstPage = useCallback(async () => {
    // Responsible for: calling fetchPageUrls, keeping pageUrls in sync, calling fetchPageData
    const urls = await fetchPageUrls();

    // Check that we have data and not an error
    if (Array.isArray(urls) && urls.length > 0) {
      setPageUrls(() => urls);
      fetchPageData();
    } else {
      setError('Something went wrong.');
    }
  }, []);

  useEffect(() => {
    fetchFirstPage();
  }, []);

  return {
    data,
    isLoading,
    isFetchingData,
    error,
    fetchPageData,
  };
};

export default useFetchUsers;
